import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, LoadingController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule, CommonModule],
})

export class Tab1Page implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  solutions: any = [];

  ngOnInit() {
    this.loadingController.create().then((loading) => {
      loading.present();
      this.api.solutions().subscribe((resp: any) => {
        this.solutions = resp.data;
        loading.dismiss();
      });
    });
  }

  goService(service_id: any) {
    this.router.navigateByUrl('solution/' + service_id);
  }

}

