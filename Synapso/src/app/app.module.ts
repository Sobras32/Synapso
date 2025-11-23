// src/app/app.module.ts (VERSÃO MODULAR)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular'; // Mantemos o que você já tinha

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from "../environments/environment";

// 1. Imports Modulares (como no PDF 2) [cite: 473-474, 477]
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot()
    // REMOVEMOS AngularFireModule e AngularFireAuthModule daqui
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // 2. Adicionamos os providers (como no PDF 2) [cite: 482-484]
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}