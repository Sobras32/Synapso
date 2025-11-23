import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonTitle,
  ToastController, LoadingController
} from '@ionic/angular/standalone';

import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonInput, IonButton, IonTitle
  ]
})
export class EsqueciSenhaPage {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacaoService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  async enviarEmail() {
    if (this.form.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Enviando e-mail...' });
    await loading.present();

    try {
      await this.authService.resetarSenha(this.form.value.email);
      loading.dismiss();
      this.mostrarMensagem('Enviamos um link de recuperação para o seu e-mail.');
    } catch (e) {
      loading.dismiss();
      this.mostrarMensagem('Não foi possível enviar o e-mail. Verifique se está correto.');
    }
  }

  private async mostrarMensagem(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }
}
