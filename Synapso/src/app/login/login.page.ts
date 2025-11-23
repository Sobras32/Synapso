import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <--- Resolve o erro do *ngIf
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'; // <--- Resolve o erro do [formGroup]

// Importando componentes do Ionic
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons,
  IonBackButton,
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // Aqui importamos tudo que o HTML precisa
  imports: [
    CommonModule, 
    ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonItem, IonLabel, IonInput, IonButton
  ]
})
export class LoginPage {
  
  loginForm: FormGroup; // <--- Cria a variável que o HTML estava procurando

  constructor(
    private authService: AutenticacaoService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
  ) {
    // Configura as regras do formulário
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // "Getters" para facilitar o acesso no HTML (resolve o erro email?.invalid)
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async login() {
    if (this.loginForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      loading.dismiss();
      this.router.navigate(['/home'], { replaceUrl: true });
    } catch (error: any) {
      loading.dismiss();
      this.exibirErro('E-mail ou senha incorretos.');
    }
  }

  async exibirErro(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}