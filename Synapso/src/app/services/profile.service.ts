import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Auth, updateProfile, user, updatePassword } from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  docData, 
  setDoc 
} from '@angular/fire/firestore';
import { 
  Storage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from '@angular/fire/storage';

export interface UserProfile {
  uid?: string;
  email?: string;
  displayName?: string;
  phone?: string;
  photoURL?: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userProfile$: Observable<UserProfile | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.userProfile$ = user(this.auth).pipe(
      switchMap(user => {
        if (!user) return of(null);

        const userDoc = doc(this.firestore, `users/${user.uid}`);
        return docData(userDoc).pipe(
          map(firestoreData => {
            return {
              uid: user.uid,
              email: user.email,
              displayName: firestoreData?.['displayName'] || user.displayName || '',
              photoURL: firestoreData?.['photoURL'] || user.photoURL || '',
              phone: firestoreData?.['phone'] || '',
              bio: firestoreData?.['bio'] || ''
            } as UserProfile;
          })
        );
      })
    );
  } // <--- O CONSTRUTOR TERMINA AQUI. AS OUTRAS FUNÇÕES VÊM ABAIXO.

  // --- NOVA FUNÇÃO DE SENHA (FORA DO CONSTRUTOR) ---
  async updatePassword(newPassword: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('Usuário desconectado');
    
    await updatePassword(currentUser, newPassword);
  }

  // --- ATUALIZAR DADOS ---
  async updateUser(data: Partial<UserProfile>) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('Usuário desconectado');

    // 1. Atualiza Auth
    if (data.displayName || data.photoURL) {
      await updateProfile(currentUser, {
        displayName: data.displayName || currentUser.displayName,
        photoURL: data.photoURL || currentUser.photoURL
      }).catch(e => console.error('Erro ao atualizar Auth:', e));
    }

    // 2. Prepara os dados para o Firestore
    const dadosParaSalvar: any = {
      updatedAt: new Date()
    };

    if (data.displayName !== undefined) dadosParaSalvar.displayName = data.displayName;
    if (data.email !== undefined) dadosParaSalvar.email = data.email;
    if (data.phone !== undefined) dadosParaSalvar.phone = data.phone;
    if (data.photoURL !== undefined) dadosParaSalvar.photoURL = data.photoURL;
    if (data.bio !== undefined) dadosParaSalvar.bio = data.bio;

    // 3. Atualiza Firestore
    const userDoc = doc(this.firestore, `users/${currentUser.uid}`);
    await setDoc(userDoc, dadosParaSalvar, { merge: true });
  }

  // --- UPLOAD (OPCIONAL SE NÃO FOR USAR MAIS) ---
  async uploadImage(file: File): Promise<string> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('Usuário desconectado');

    try {
      const path = `avatars/${currentUser.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, path);
      
      console.log('Iniciando uploadBytes...');
      const result = await uploadBytes(storageRef, file);
      
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (error) {
      console.error('Erro upload:', error);
      throw error;
    }
  }
}