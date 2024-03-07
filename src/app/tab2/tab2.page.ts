import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PreferencesService } from '../services/preferences.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule, CommonModule]
})
export class Tab2Page {

  constructor(
    private api: ApiService,
    private router: Router,
    private loadingController: LoadingController,
    private preferences: PreferencesService
  ) { }

  manufacturers: any = [];
  access_token: any;
  user: any;

  ionViewWillEnter() {
    this.preferences.checkName('access_token').then((resp) => {
      this.access_token = resp.value;
      if (this.access_token) {
        this.api.user(this.access_token).subscribe((resp) => {
          this.user = resp;
          console.log(this.user);
        });
      }
    });
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.manufacturers().subscribe((resp: any) => {
        this.manufacturers = resp.data;
        loading.dismiss();
      });
    });
  }

  goManufacturer(manufacturer_id: any) {
    this.router.navigateByUrl('manufacturer/' + manufacturer_id);
  }

}
