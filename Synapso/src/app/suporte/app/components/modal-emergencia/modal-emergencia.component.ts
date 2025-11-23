import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-emergencia',
  templateUrl: './modal-emergencia.component.html',
  styleUrls: ['./modal-emergencia.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ModalEmergenciaComponent {

  constructor(private modalCtrl: ModalController) { }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  // Tenta abrir o discador do celular
  ligarCVV() {
    window.open('tel:188', '_system');
  }

  ligarSAMU() {
    window.open('tel:192', '_system');
  }
}