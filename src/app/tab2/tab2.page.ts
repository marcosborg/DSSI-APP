import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule, CommonModule]
})
export class Tab2Page implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  manufacturers: any = [];

  ngOnInit() {
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
