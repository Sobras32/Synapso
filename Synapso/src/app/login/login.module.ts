import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page'; // Importe a página aqui em cima

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    LoginPage, // <<-- ADICIONE A PÁGINA AQUI, NOS IMPORTS
  ],
  declarations: [] // <<-- DEIXE O DECLARATIONS VAZIO
})
export class LoginPageModule {}