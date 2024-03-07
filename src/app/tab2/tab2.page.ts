import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
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
    private router: Router
  ) { }

  manufacturers: any = [];

  ngOnInit() {
    this.getManufacturers();
  }

  getManufacturers() {
    this.api.manufacturers().subscribe((resp: any) => {
      this.manufacturers = resp.data;
      console.log(this.manufacturers);
    });
  }

  goManufacturer(manufacturer_id: any) {
    this.router.navigateByUrl('manufacturer/' + manufacturer_id);
  }

}
