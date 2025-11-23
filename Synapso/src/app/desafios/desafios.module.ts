// Em: src/app/desafios/desafios.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DesafiosPageRoutingModule } from './desafios-routing.module';
// Note que NÃO importamos mais o FormsModule nem o DesafiosPage aqui em cima

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DesafiosPageRoutingModule
    // REMOVA o FormsModule daqui
  ],
  // REMOVA todo o array "declarations: [DesafiosPage]"
  // O erro NG6008 acontece porque um componente standalone não pode ser declarado.
})
export class DesafiosPageModule {}