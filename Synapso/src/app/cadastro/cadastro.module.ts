import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page'; // Importe a página

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    CadastroPage, // <<-- ADICIONE A PÁGINA AQUI, NOS IMPORTS
  ],
  declarations: [] // <<-- DEIXE O DECLARATIONS VAZIO
})
export class CadastroPageModule {}
