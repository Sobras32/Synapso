import { Injectable } from '@angular/core';

// 1. Interface (definida aqui para ser usada em todo o app)
export interface EntradaDiario {
  mood: string;
  texto: string;
  dataKey: string; // 'YYYY-MM-DD'
}

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  // Chave para salvar no LocalStorage
  private readonly STORAGE_KEY = 'meuDiarioSynapso';

  // O "banco de dados" em memória (Map)
  private entradas = new Map<string, EntradaDiario>();

  constructor() {
    // 2. Ao iniciar o serviço, carrega os dados salvos
    this.carregarDoStorage();
  }

  // 3. Carrega do LocalStorage
  private carregarDoStorage() {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (dadosSalvos) {
      // Converte o texto JSON de volta para um array de objetos
      const arrayDeEntradas: EntradaDiario[] = JSON.parse(dadosSalvos);
      
      // Converte o array de volta para um Map
      this.entradas = new Map(
        arrayDeEntradas.map(entrada => [entrada.dataKey, entrada])
      );
    }
  }

  // 4. Salva no LocalStorage
  private salvarNoStorage() {
    // Converte o Map para um Array (localStorage só salva texto)
    const arrayDeEntradas = Array.from(this.entradas.values());
    
    // Converte o array para texto JSON e salva
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(arrayDeEntradas));
  }

  // 5. Função que as páginas vão chamar para salvar
  public salvarEntrada(entrada: EntradaDiario) {
    this.entradas.set(entrada.dataKey, entrada);
    this.salvarNoStorage(); // Salva imediatamente
  }

  // 6. Função para o calendário pegar uma entrada específica
  public getEntradaPorData(dataKey: string): EntradaDiario | undefined {
    return this.entradas.get(dataKey);
  }

  // 7. Função para a página de lista pegar TODAS as entradas
  public getEntradasOrdenadas(): EntradaDiario[] {
    return Array.from(this.entradas.values())
      .sort((a, b) => {
        // Ordena do mais novo para o mais antigo
        return new Date(b.dataKey).getTime() - new Date(a.dataKey).getTime();
      });
  }
}