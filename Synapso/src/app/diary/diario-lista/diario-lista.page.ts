import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, | date
import { IonicModule } from '@ionic/angular';
import { DiarioService, EntradaDiario } from '../../services/diario.service'; // Importa o serviço
// import { RouterLink } from '@angular/router'; // <-- 1. APAGUE ESTA LINHA

@Component({
  selector: 'app-diario-lista',
  templateUrl: './diario-lista.page.html',
  styleUrls: ['./diario-lista.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    // RouterLink // <-- 2. APAGUE ESTA LINHA TAMBÉM
  ]
})
export class DiarioListaPage {

  public entradasSalvas: EntradaDiario[] = [];

  constructor(private diarioService: DiarioService) {}

  ionViewWillEnter() {
    this.carregarEntradas();
  }

  carregarEntradas() {
    this.entradasSalvas = this.diarioService.getEntradasOrdenadas();
  }
}