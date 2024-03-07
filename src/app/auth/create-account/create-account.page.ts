import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

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
    private loadingController: LoadingController
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
      password_confirmation: this.password_confirmation
    }
    
  }

}
