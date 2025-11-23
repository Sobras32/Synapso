import { Injectable } from '@angular/core';

export interface MoodEntry {
  value: number; // 1 (Péssimo) a 5 (Ótimo)
  comment?: string;
  time: string; // ISO string
}

// Interface para os dados de análise que vamos calcular
export interface AnalyticsData {
  averageScore: number; // Média de 0 a 100
  distribution: { [key: number]: number }; // Contagem de cada humor
  timeline: { labels: string[], data: number[] }; // Dados para o gráfico de linha
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private readonly STORAGE_KEY = 'mood_history';
  private history: MoodEntry[] = [];

  constructor() {
    this.loadHistory();
  }

  getHistory(): MoodEntry[] {
    return this.history;
  }

  addEntry(entry: MoodEntry) {
    this.history.unshift(entry);
    if (this.history.length > 200) {
      this.history.pop();
    }
    this.persistHistory();
  }

  deleteEntry(index: number) {
    this.history.splice(index, 1);
    this.persistHistory();
  }

  /**
   * NOVO: Calcula todas as estatísticas para o dashboard
   */
  getAnalytics(periodInDays: number): AnalyticsData {
    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - periodInDays));

    const filteredHistory = this.history.filter(entry => new Date(entry.time) >= startDate);

    if (filteredHistory.length === 0) {
      return { averageScore: 0, distribution: {}, timeline: { labels: [], data: [] } };
    }

    // 1. Calcular Média de Humor (convertendo 1-5 para 0-100)
    const totalScore = filteredHistory.reduce((sum, entry) => sum + (entry.value - 1) * 25, 0);
    const averageScore = Math.round(totalScore / filteredHistory.length);

    // 2. Calcular Distribuição de Humor
    const distribution = filteredHistory.reduce((acc, entry) => {
      acc[entry.value] = (acc[entry.value] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    // 3. Preparar dados da Linha do Tempo
    // Invertemos para mostrar do mais antigo para o mais novo
    const sortedHistory = [...filteredHistory].reverse();
    const timeline = {
      labels: sortedHistory.map(e => new Date(e.time).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
      data: sortedHistory.map(e => e.value)
    };

    return { averageScore, distribution, timeline };
  }


  private persistHistory() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
  }

  private loadHistory() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    this.history = raw ? JSON.parse(raw) : [];
  }
}