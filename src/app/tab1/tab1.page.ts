import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PreferencesService } from '../services/preferences.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule, CommonModule],
})

export class Tab1Page {
  constructor(
    private api: ApiService,
    private router: Router,
    private loadingController: LoadingController,
    private preferences: PreferencesService
  ) { }

  solutions: any = [];
  access_token: any;
  user: any;

  ionViewWillEnter() {
    this.preferences.checkName('access_token').then((resp) => {
      this.access_token = resp.value;
      if (this.access_token) {
        this.api.user(this.access_token).subscribe((resp) => {
          this.user = resp;
          this.getSolutions();
        });
      } else {
        this.getSolutions();
      }
    });
  }

  getSolutions() {
    this.api.solutions().subscribe((resp: any) => {
      this.solutions = resp.data;
    });
  }

  goService(service_id: any) {
    this.router.navigateByUrl('solution/' + service_id);
  }

}

