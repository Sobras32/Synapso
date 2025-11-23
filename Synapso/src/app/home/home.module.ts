// src/app/home/home.module.ts (Versão Corrigida)

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page'; // 1. Importa a página

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HomePage // <-- 2. ADICIONE A PÁGINA AQUI (em imports)
  ],
  declarations: [] // <-- 3. DEIXE O DECLARATIONS VAZIO
})
export class HomePageModule {}