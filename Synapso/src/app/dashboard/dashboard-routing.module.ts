// src/app/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Lembre-se que o nome aqui pode ser 'MoodDashboardPage'
// conforme o erro anterior que corrigimos.
import { MoodDashboardPage } from './dashboard.page'; 

const routes: Routes = [
  {
    path: '',
    component: MoodDashboardPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// ✅ AQUI É O PONTO CRÍTICO: Verifique se o nome da classe está correto e se tem "export"
export class DashboardPageRoutingModule {}