import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { PlanoCrise } from '../../models/plano-crise.model';

// Importe TODOS os modais
import { ModalEmergenciaComponent } from '../../components/modal-emergencia/modal-emergencia.component';
import { ModalRespiracaoComponent } from '../../components/modal-respiracao/modal-respiracao.component';
import { ModalAncoragemComponent } from '../../components/modal-ancoragem/modal-ancoragem.component';
import { ModalPlanoComponent } from '../../components/modal-plano/modal-plano.component';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuportePage implements OnInit {

  // O plano do usuário (começa nulo)
  meuPlano: PlanoCrise | null = null;
  // Exemplo de como seria se estivesse carregado:
  // meuPlano: PlanoCrise | null = { idUsuario: '123', pessoasContato: 'Mãe, João', coisasAcalmam: 'Ouvir música', lembretesPositivos: 'Vai passar' };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController // Usado pelo ion-back-button
  ) { }

  ngOnInit() {
    // TODO: Aqui você deve carregar o plano do usuário do Firebase/Banco de Dados
    // e salvar em 'this.meuPlano'.
  }

  // --- FUNCIONALIDADES ---

  // 1. Modal de Emergência
  async abrirModalEmergencia() {
    const modal = await this.modalCtrl.create({
      component: ModalEmergenciaComponent,
      cssClass: 'modal-pequeno', // Classe para estilizar o tamanho
      backdropDismiss: true,
    });
    await modal.present();
  }

  // 2. Modal de Respiração
  async abrirModalRespiracao() {
    const modal = await this.modalCtrl.create({
      component: ModalRespiracaoComponent,
      cssClass: 'modal-fullscreen' // Tela cheia para focar
    });
    await modal.present();
  }

  // 3. Modal de Ancoragem (5-4-3-2-1)
  async abrirModalAncoragem() {
    const modal = await this.modalCtrl.create({
      component: ModalAncoragemComponent,
    });
    await modal.present();
  }

  // 4. Modal do Plano de Cuidado
  async abrirModalPlano() {
    const modal = await this.modalCtrl.create({
      component: ModalPlanoComponent,
      // Envia o plano ATUAL (mesmo que seja nulo) para o modal
      componentProps: {
        'planoAtual': this.meuPlano 
      }
    });

    await modal.present();

    // Ouve o que o modal "devolveu" ao ser fechado
    const { data } = await modal.onDidDismiss();
    
    if (data) {
      // O usuário salvou o plano!
      // 'data' é o objeto PlanoCrise que veio do modal
      this.meuPlano = data;
      // TODO: Salve este 'this.meuPlano' no seu Firebase/Banco de Dados
      console.log('Plano salvo:', this.meuPlano);
    }
  }
}