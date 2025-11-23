// src/app/cadastro/cadastro.page.ts (Versão Atualizada)

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

// NOSSOS DOIS SERVIÇOS
import { AutenticacaoService } from '../services/autenticacao.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CadastroPage {

  credentials = {
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordsDoNotMatch = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AutenticacaoService, // Serviço de Auth
    private usuarioService: UsuarioService // Serviço de Banco de Dados
  ) { }

  onPhoneInput(event: any) {
    const value = event.target.value;
    this.credentials.phone = value.replace(/[^0-9]/g, '');
    event.target.value = this.credentials.phone;
  }

  async register() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.passwordsDoNotMatch = false;

    try {
      // 1. Cria o usuário no Firebase Auth
      const userCredential = await this.authService.cadastro(
        this.credentials.email,
        this.credentials.password
      );

      // 2. VERIFICA SE O USUÁRIO EXISTE (AQUI ESTÁ A CORREÇÃO)
      if (userCredential.user) {
        // 3. Se funcionar, pega o UID
        const uid = userCredential.user.uid;

        // 4. Salva os dados extras no Firestore
        await this.usuarioService.createUserProfile(uid, this.credentials);

        // 5. Sucesso!
        this.exibeMensagem('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      } else {
        // Isso não deve acontecer, mas é bom ter
        throw new Error("Não foi possível obter o usuário após o cadastro.");
      }

    } catch (error: any) {
      // 5. Trata erros
      console.error("Erro no cadastro:", error);
      if (error.code === 'auth/email-already-in-use') {
        this.exibeMensagem('Este e-mail já está em uso.');
      } else {
        this.exibeMensagem('Erro ao criar usuário.');
      }
    }
  }

  async exibeMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: 'primary'
    });
    toast.present();
  }
}