// src/app/services/usuario.service.ts (VERSÃO MODULAR)

import { Injectable } from '@angular/core';
// 1. Imports Modulares (como no PDF 2) [cite: 526]
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  collectionData 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UserProfile {
  uid: string;
  nome: string;
  nickname: string;
  birthdate: string;
  phone: string;
  email: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // 2. Injete 'Firestore' (modular) em vez de 'AngularFirestore' (compat) [cite: 534]
  constructor(private firestore: Firestore) {} // <-- MUDANÇA AQUI

  // Pega todos os usuários para o painel de admin
  getUsers(): Observable<UserProfile[]> {
    // 3. Sintaxe modular para pegar uma coleção [cite: 536-539]
    const usersCollection = collection(this.firestore, 'users');
    // 'collectionData' já retorna um Observable
    return collectionData(usersCollection, { idField: 'uid' }) as Observable<UserProfile[]>;
  }

  // Cria o perfil do usuário no Firestore
  createUserProfile(uid: string, data: any) {
    // 4. Sintaxe modular para apontar para um documento [cite: 542]
    const userDocRef = doc(this.firestore, `users/${uid}`);
    
    const profile: Omit<UserProfile, 'uid'> = { // Usamos Omit para não repetir o UID
      nome: data.name,
      nickname: data.nickname,
      birthdate: data.birthdate,
      phone: data.phone,
      email: data.email,
      role: 'user'
    };
    // 5. Sintaxe modular para salvar dados [cite: 556] (similar a updateDoc)
    return setDoc(userDocRef, profile);
  }

  // Atualiza usuário
  updateUser(uid: string, data: Partial<UserProfile>) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return updateDoc(userDocRef, data); // [cite: 556]
  }

  // Deleta usuário
  deleteUser(uid: string) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return deleteDoc(userDocRef); // [cite: 551]
  }
}