import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// 1. Importe o addIcons e os ícones específicos
import { addIcons } from 'ionicons';
import { 
  sparklesOutline, 
  personCircleOutline, 
  schoolOutline,
  chevronBack // Necessário se o botão de voltar não aparecer a seta
} from 'ionicons/icons';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ] 
})
export class SobreNosPage implements OnInit {

  constructor() { 
    // 2. Registre os ícones aqui dentro do construtor
    addIcons({ 
      sparklesOutline, 
      personCircleOutline, 
      schoolOutline,
      chevronBack 
    });
  }

  ngOnInit() {
  }

}