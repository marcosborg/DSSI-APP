import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonFooter,
    IonButton,
    IonButtons,
    IonBackButton
  ],
})
export class CreateAccountPage implements OnInit {

  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  countries: any = [];
  name: string = '';
  email: string = '';
  company_name: string = '';
  vat: string = '';
  address: string = '';
  zip: string = '';
  location: string = '';
  country_id: any;
  password: string = '';
  password_confirmation: string = '';
  phone: string = '';

  ngOnInit() {
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.countries().subscribe((resp: any) => {
        loading.dismiss();
        this.countries = resp.data;
      });
    });
  }

  createAccount() {
    let data = {
      name: this.name,
      email: this.email,
      company_name: this.company_name,
      vat: this.vat,
      address: this.address,
      zip: this.zip,
      location: this.location,
      country_id: this.country_id,
      password: this.password,
      password_confirmation: this.password_confirmation,
      phone: this.phone
    }
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.register(data).subscribe((resp: any) => {
        loading.dismiss();
        let user = resp;
        this.alertController.create({
          header: 'Account created',
          message: 'Welcome ' + user.name + '! Your account will be verified before you can view prices and request quotes.',
          backdropDismiss: false,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl('/login');
              }
            }
          ]
        }).then((alert) => {
          alert.present();
        });
      }, (err: any) => {
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
