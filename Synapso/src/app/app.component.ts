import { Component } from '@angular/core';
// 1. Importe os componentes do Ionic aqui
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // Garanta que isto está aqui
  // 2. Adicione-os na lista de imports
  imports: [IonApp, IonRouterOutlet], 
})
export class AppComponent {
  constructor() {}
}