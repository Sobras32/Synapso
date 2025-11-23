import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
   {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), 
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule), 
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'sobre-nos',
    loadChildren: () => import('./sobre-nos/sobre-nos.module').then( m => m.SobreNosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'desafios',
    loadChildren: () => import('./desafios/desafios.module').then( m => m.DesafiosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'suporte',
    loadComponent: () => import('./suporte/app/pages/suporte/suporte.page').then( m => m.SuportePage), canActivate: [AuthGuard]
  },
  {
    path: 'diario',
    loadComponent: () => import('./diary/diario/diario.page').then( m => m.DiarioPage), canActivate: [AuthGuard]
  },
  {
    path: 'diario-lista',
    loadComponent: () => import('./diary/diario-lista/diario-lista.page').then( m => m.DiarioListaPage), canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule), canActivate: [AuthGuard]
  },
  {
  path: 'esqueci-senha',
    loadComponent: () =>
    import('./esqueci-senha/esqueci-senha.page').then(m => m.EsqueciSenhaPage)
},
  {
  path: 'termos-de-uso',
  loadComponent: () => import('./termos/termos.page').then(m => m.TermosPage)
},
{
  path: 'politica-privacidade',
  loadComponent: () => import('./privacidade/privacidade.page').then(m => m.PrivacidadePage)
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
