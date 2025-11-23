// src/app/login-admin/login-admin.page.ts
// Este arquivo já está correto.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Imports necessários para o formulário
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Import do nosso serviço de auth
import { AuthService } from '../../../paginas principais/login-adm/src/app/services/auth.service';

@Component({
  selector: 'app-login-admin', // <-- Nome correto
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
  standalone: true,
  imports: [ // <-- Dependências corretas
    IonicModule,
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class LoginAdminPage implements OnInit { // <-- Nome correto
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService 
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Lógica de login correta para o admin
  async login() { 
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Log específico do Admin
    console.log('Tentando logar (ADMIN) com:', this.loginForm.value);

    try {
      // 1. (FUTURO) Verificar no Firebase se é um admin
      
      // 2. (POR ENQUANTO) Simular um login de admin
      const dadosDoUsuarioSimulado = {
        nome: "Administrador",
        email: this.loginForm.value.email,
        photoURL: "assets/icon/favicon.png" // Foto de admin
      };

      // 3. Chamar o AuthService
      await this.auth.loginComSucesso(dadosDoUsuarioSimulado);

      // 4. Navegar para a home
      this.router.navigateByUrl('/home');

    } catch (err) {
      console.error("Erro ao tentar fazer login (ADMIN):", err);
    }
  }
}