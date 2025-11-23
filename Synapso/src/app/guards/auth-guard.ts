import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service'; // Confirme se o caminho está certo
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1), // Olha o valor apenas uma vez
      map(usuarioLogado => {
        if (!usuarioLogado) {
          // Se NÃO estiver logado:
          console.log('Acesso negado! Redirecionando para Login...');
          this.router.navigate(['/login']);
          return false;
        }
        // Se estiver logado, permite a entrada:
        return true;
      })
    );
  }
}