// src/app/services/services-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// AQUI ESTÁ A CORREÇÃO: Importe a PÁGINA do arquivo da PÁGINA.
import { MoodService } from './mood.service';

const routes: Routes = [
  {
    path: '',
    component: MoodService // Agora o Angular sabe qual componente/tela mostrar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}