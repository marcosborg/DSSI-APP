import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonList, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonList,
    IonItem,
    IonInput,
    FormsModule,
    IonCardContent,
    IonFooter,
    IonButton,
    IonImg
  ]
})
export class LoginPage implements OnInit {

  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private preferences: PreferencesService,
    private alertController: AlertController,
    private router: Router
  ) { }

  email: string = 'wegogo@mailinator.com';
  password: string = '123456';

  ngOnInit() {
  }

  login() {
    let data = {
      email: this.email,
      password: this.password
    }
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.login(data).subscribe((resp: any) => {
        loading.dismiss();
        this.preferences.setName('access_token', resp.access_token).then(() => {
          this.preferences.checkName('access_token').then((resp) => {
            this.alertController.create({
              header: 'Success',
              message: 'Login successfully',
              backdropDismiss: false,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.router.navigateByUrl('/');
                  }
                }
              ]
            }).then((alert) => {
              alert.present();
            });
          });
        });
      }, (err) => {
        loading.dismiss();
        let errors = err.error.errors;
        const errorKeys = Object.keys(errors);
        let html = '';
        errorKeys.forEach(key => {
          errors[key].forEach((message: string) => {
            html += message;
          });
        });
        this.alertController.create({
          header: 'Validation error',
          message: html,
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
          ]
        }).then((alert) => {
          alert.present();
        });
      });
    });

  }

}
