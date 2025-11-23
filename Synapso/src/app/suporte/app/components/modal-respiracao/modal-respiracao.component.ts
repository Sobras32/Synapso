import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-respiracao',
  templateUrl: './modal-respiracao.component.html',
  styleUrls: ['./modal-respiracao.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ModalRespiracaoComponent implements OnInit {

  textoGuia: string = 'Inspire';
  intervalo: any; // Para controlar o timer

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.iniciarAnimacao();
  }

  iniciarAnimacao() {
    
    this.intervalo = setInterval(() => {
      if (this.textoGuia === 'Inspire') {
        this.textoGuia = 'Expire';
      } else {
        this.textoGuia = 'Inspire';
      }
    }, 4000); // A animação dura 8s no total (4s para cada fase)
  }

  fecharModal() {
    clearInterval(this.intervalo); // Para o timer ao fechar
    this.modalCtrl.dismiss();
  }
}