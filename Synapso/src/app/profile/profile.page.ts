import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonAvatar, IonIcon, IonCard, IonCardContent,
  IonList, IonItem, IonLabel, IonInput, IonButton,
  LoadingController, ToastController
} from '@ionic/angular/standalone';

import { ProfileService } from '../services/profile.service';
import type { UserProfile } from '../services/profile.service';

import { addIcons } from 'ionicons';
import {
  refreshOutline, personOutline, mailOutline, callOutline,
  lockClosedOutline, eyeOutline, eyeOffOutline,
  checkmarkCircle, alertCircle
} from 'ionicons/icons';

import { Auth, deleteUser, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonAvatar, IonIcon, IonCard, IonCardContent,
    IonList, IonItem, IonLabel, IonInput, IonButton
  ]
})
export class ProfilePage implements OnInit {

  user: UserProfile = {
    uid: '',
    displayName: '',
    email: '',
    phone: '',
    photoURL: '',
    bio: ''
  };

  newPassword = '';
  showPassword = false;

  constructor(
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private auth: Auth
  ) {
    addIcons({
      refreshOutline, personOutline, mailOutline, callOutline,
      lockClosedOutline, eyeOutline, eyeOffOutline,
      checkmarkCircle, alertCircle
    });
  }

  ngOnInit() {
    this.profileService.userProfile$.subscribe((data) => {
      if (data) {
        this.user = { ...data };
        if (!this.user.photoURL) {
          this.refreshAvatar(false);
        }
      }
    });
  }

  private getAvatarUrl(name: string): string {
    const cleanName = name ? name.trim().replace(/\s+/g, '+') : 'User';
    return `https://ui-avatars.com/api/?name=${cleanName}&background=random&size=256&bold=true`;
  }

  refreshAvatar(saveNow: boolean = true) {
    this.user.photoURL = this.getAvatarUrl(this.user.displayName || '');
    if (saveNow) this.showToast('Avatar atualizado!', 'success');
  }

  async saveProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando alterações...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      if (!this.user.photoURL || this.user.photoURL.includes('ui-avatars.com')) {
        this.user.photoURL = this.getAvatarUrl(this.user.displayName || '');
      }

      await this.profileService.updateUser({
        displayName: this.user.displayName,
        phone: this.user.phone,
        bio: this.user.bio,
        photoURL: this.user.photoURL
      });

      if (this.newPassword && this.newPassword.length >= 6) {
        await this.profileService.updatePassword(this.newPassword);
        this.newPassword = '';
      } else if (this.newPassword && this.newPassword.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }

      await this.showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        await this.showToast('Por segurança, faça login novamente.', 'warning');
      } else {
        await this.showToast(error.message || 'Erro ao salvar perfil.', 'danger');
      }
    } finally {
      loading.dismiss();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /** ------------------------- LOGOUT ------------------------- **/
  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Saindo...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      await signOut(this.auth);
      await this.showToast('Logout realizado!', 'success');
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error(error);
      this.showToast('Erro ao sair.', 'danger');
    } finally {
      loading.dismiss();
    }
  }

  /** ------------------------- CONFIRMAR EXCLUSÃO ------------------------- **/
  async confirmDeleteAccount() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluir conta?';
    alert.message = 'Essa ação é permanente!';
    alert.buttons = [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Excluir',
        role: 'destructive',
        handler: () => this.deleteAccount()
      }
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  /** ------------------------- EXCLUIR CONTA ------------------------- **/
  async deleteAccount() {
    const loading = await this.loadingCtrl.create({
      message: 'Excluindo conta...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Nenhum usuário logado.');

      await deleteUser(user);

      await this.showToast('Conta excluída com sucesso.', 'success');
      this.router.navigate(['/login'], { replaceUrl: true });

    } catch (error: any) {
      console.error(error);

      if (error.code === 'auth/requires-recent-login') {
        this.showToast('Faça login novamente para excluir sua conta.', 'warning');
        this.router.navigate(['/login']);
      } else {
        this.showToast('Erro ao excluir a conta.', 'danger');
      }

    } finally {
      loading.dismiss();
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    toast.present();
  }
}
