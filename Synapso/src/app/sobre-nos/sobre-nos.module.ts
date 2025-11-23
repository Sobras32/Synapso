import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobreNosPageRoutingModule } from './sobre-nos-routing.module';

import { SobreNosPage } from './sobre-nos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobreNosPageRoutingModule,
    SobreNosPage // <-- ADICIONE AQUI
  ],
  declarations: [] // <-- REMOVA DAQUI (deixe o array vazio)
})
export class SobreNosPageModule {}