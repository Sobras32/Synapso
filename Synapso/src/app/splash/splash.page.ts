import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [
    IonContent
  ]
})
export class SplashPage implements AfterViewInit {

  constructor(private router: Router) {}

 ngAfterViewInit() {
  const video = document.querySelector<HTMLVideoElement>('.splash-video');
  const overlay = document.querySelector<HTMLElement>('.fade-overlay');

  if (video) {
    video.muted = true;
    video.play().catch(() => {});
  }

  
  setTimeout(() => {
    if (overlay) overlay.classList.add('fade-out');

    
    setTimeout(() => {
      this.goHome();
    }, 1000);
  }, 5000); 
}


  goHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
