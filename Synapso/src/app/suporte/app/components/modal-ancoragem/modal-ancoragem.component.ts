import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importe o SCHEMA
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-modal-ancoragem',
  templateUrl: './modal-ancoragem.component.html',
  styleUrls: ['./modal-ancoragem.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Adicione o SCHEMA para o Swiper
})
export class ModalAncoragemComponent {
  constructor(private modalController: ModalController) {}
  fecharModal() {
    this.modalController.dismiss();
  }
  onSlideChange(event: any) {
    console.log('Slide mudou', event);
  }
}
