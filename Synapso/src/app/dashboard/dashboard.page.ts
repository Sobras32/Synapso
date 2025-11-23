import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { MoodService, MoodEntry, AnalyticsData } from '../services/mood.service';

interface MoodOption {
  value: number; label: string; emoji: string; color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MoodDashboardPage implements AfterViewInit {
  @ViewChild('distributionChart') private distributionChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timelineChart') private timelineChartCanvas!: ElementRef<HTMLCanvasElement>;

  // Gráficos de Análise
  distributionChart!: Chart;
  timelineChart!: Chart;

  comment: string = '';
  selectedMood: MoodOption | null = null;
  history: MoodEntry[] = [];
  analyticsData: AnalyticsData | null = null;
  selectedPeriod: number = 7; // Padrão para 7 dias

  moodOptions: MoodOption[] = [
    { value: 1, label: 'Péssimo', emoji: '😭', color: '#e74c3c' },
    { value: 2, label: 'Ruim', emoji: '😟', color: '#f1c40f' },
    { value: 3, label: 'Normal', emoji: '😐', color: '#3498db' },
    { value: 4, label: 'Bom', emoji: '😊', color: '#2ecc71' },
    { value: 5, label: 'Ótimo', emoji: '😁', color: '#1abc9c' }
  ];

  constructor(
    private moodService: MoodService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.history = this.moodService.getHistory();
    this.analyticsData = this.moodService.getAnalytics(this.selectedPeriod);
    
    setTimeout(() => {
      this.createDistributionChart();
      this.createTimelineChart();
    }, 150);
  }

  onPeriodChange(event: any) {
    this.selectedPeriod = Number(event.detail.value);
    this.analyticsData = this.moodService.getAnalytics(this.selectedPeriod);
    this.updateCharts();
  }

  // --- Gráficos de Análise ---

  createDistributionChart() {
    if (!this.analyticsData || !this.distributionChartCanvas) return;
    if (this.distributionChart) this.distributionChart.destroy();

    const distribution = this.analyticsData.distribution;
    const totalEntries = Object.values(distribution).reduce((a, b) => a + b, 0);

    const chartData = this.moodOptions.map(mood => ({
      mood,
      count: distribution[mood.value] || 0
    }));

    this.distributionChart = new Chart(this.distributionChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: chartData.map(d => d.mood.emoji),
        datasets: [{
          label: 'Distribuição de Humor',
          data: chartData.map(d => totalEntries > 0 ? (d.count / totalEntries) * 100 : 0),
          backgroundColor: chartData.map(d => d.mood.color),
          borderRadius: 4,
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => `${(context.parsed.y || 0).toFixed(1)}%` } }
        },
        scales: { y: { beginAtZero: true, title: { display: true, text: 'Porcentagem (%)' } } }
      }
    });
  }

  createTimelineChart() {
    if (!this.analyticsData || !this.timelineChartCanvas) return;
    if (this.timelineChart) this.timelineChart.destroy();

    const timeline = this.analyticsData.timeline;

    this.timelineChart = new Chart(this.timelineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: timeline.labels,
        datasets: [{
          label: 'Humor Diário',
          data: timeline.data,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: {
            min: 1, max: 5,
            ticks: {
              stepSize: 1,
              callback: (value) => this.moodOptions.find(m => m.value === value)?.emoji || ''
            }
          }
        }
      }
    });
  }

  updateCharts() {
    if (!this.analyticsData || !this.distributionChart || !this.timelineChart) return;

    const totalEntries = Object.values(this.analyticsData.distribution).reduce((a, b) => a + b, 0);
    this.distributionChart.data.datasets[0].data = this.moodOptions.map(mood => {
        const count = this.analyticsData!.distribution[mood.value] || 0;
        return totalEntries > 0 ? (count / totalEntries) * 100 : 0;
    });
    this.distributionChart.update();

    this.timelineChart.data.labels = this.analyticsData.timeline.labels;
    this.timelineChart.data.datasets[0].data = this.analyticsData.timeline.data;
    this.timelineChart.update();
  }
  
  // --- FUNÇÕES DE REGISTRO QUE ESTAVAM FALTANDO ---

  selectMood(mood: MoodOption) {
    this.selectedMood = mood;
  }

  async saveEntry() {
    if (!this.selectedMood) {
      this.presentToast('Por favor, selecione seu humor.', 'warning');
      return;
    }

    const newEntry: MoodEntry = {
      value: this.selectedMood.value,
      comment: this.comment?.trim(),
      time: new Date().toISOString()
    };
    
    this.moodService.addEntry(newEntry);
    this.comment = '';
    this.selectedMood = null;
    
    this.presentToast('Humor salvo com sucesso!', 'success');
    
    // Recarrega os dados e atualiza os gráficos
    this.loadData();
  }

  async deleteEntry(index: number) {
    // Esta função não está sendo usada no novo layout, mas é bom mantê-la caso adicione um botão de apagar no futuro
    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão',
      message: 'Você tem certeza que deseja apagar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            this.moodService.deleteEntry(index);
            this.presentToast('Registro apagado.', 'danger');
            this.loadData();
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}