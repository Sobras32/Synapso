import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { PlanoCrise } from '../../models/plano-crise.model';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

@Component({
  selector: 'app-modal-plano',
  templateUrl: './modal-plano.component.html',
  styleUrls: ['./modal-plano.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Adicione o FormsModule
})
export class ModalPlanoComponent implements OnInit {

  // Recebe o plano que a página de suporte enviou
  @Input() planoAtual: PlanoCrise | null = null;
  
  // 'plano' é o objeto que o formulário (ngModel) está editando
  plano: PlanoCrise = {
    idUsuario: '123', // TODO: Pegue o ID do usuário logado
    pessoasContato: '',
    coisasAcalmam: '',
    sinaisCrise: '',
    lembretesPositivos: ''
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // Se um plano foi enviado (modo de edição), preenche o formulário
    if (this.planoAtual) {
      this.plano = { ...this.planoAtual };
    }
  }

  fecharModal() {
    this.modalCtrl.dismiss(); // Fecha sem salvar (envia null)
  }

  salvarPlano() {
    // Fecha e DEVOLVE o plano preenchido para a página de suporte
    this.modalCtrl.dismiss(this.plano); 
  }
}