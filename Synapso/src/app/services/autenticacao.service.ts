// src/app/services/autenticacao.service.ts (VERSÃO MODULAR)

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { sendPasswordResetEmail } from '@angular/fire/auth';

// 1. Imports Modulares
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asObservable();
  public user: any = null;

  // 2. Injete 'Auth' (modular) em vez de 'AngularFireAuth' (compat)
  constructor(
    private auth: Auth, // <-- MUDANÇA AQUI
    private router: Router
  ) {
    // 3. onAuthStateChanged é a forma modular de ouvir o estado
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        this._isLoggedIn.next(true);
      } else {
        this.user = null;
        this._isLoggedIn.next(false);
      }
    });
  }

  // 4. Funções de login/cadastro usam 'this.auth'
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  cadastro(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
  resetarSenha(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}