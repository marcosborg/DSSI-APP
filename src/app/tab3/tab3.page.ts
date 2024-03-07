import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, AlertController } from '@ionic/angular/standalone';
import { PreferencesService } from '../services/preferences.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3Page {
  constructor(
    private preferences: PreferencesService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.preferences.checkName('access_token').then((resp) => {
      this.access_token = resp.value;
      console.log(this.access_token);
    });
  }

  access_token: any;

  logout() {
    this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.preferences.removeName('access_token').then(() => {
              location.href = '/login';
            });
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }
}
