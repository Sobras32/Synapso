import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../services/autenticacao.service';

// 1. Importações dos componentes visuais do Ionic
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonAvatar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonIcon, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonFooter 
} from '@ionic/angular/standalone';

// 2. Importação da função de registro e dos desenhos dos ícones
import { addIcons } from 'ionicons';
import { 
  appsOutline, 
  bookOutline, 
  trophyOutline, 
  headsetOutline, 
  arrowForwardOutline, 
  happyOutline, 
  documentTextOutline, 
  statsChartOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // 3. Lista de tudo que o HTML usa
  imports: [
    CommonModule,
    RouterModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
    IonAvatar, IonGrid, IonRow, IonCol, IonIcon, IonCard, 
    IonCardHeader, IonCardTitle, IonCardContent, IonFooter
  ]
})
export class HomePage {

  constructor(
    public auth: AutenticacaoService,
    private router: Router
  ) {
    // 4. Registro dos ícones (Converte de CamelCase para kebab-case automaticamente)
    addIcons({ 
      appsOutline, 
      bookOutline, 
      trophyOutline, 
      headsetOutline, 
      arrowForwardOutline, 
      happyOutline, 
      documentTextOutline, 
      statsChartOutline 
    });
  }

  // --- SEUS MÉTODOS ---

  fazerLogout() {
    this.auth.logout()
      .then(() => console.log("Usuário deslogado"))
      .catch((error) => console.error("Erro ao fazer logout:", error));
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  irParaDiario() {
    this.router.navigate(['/diario']);
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
}