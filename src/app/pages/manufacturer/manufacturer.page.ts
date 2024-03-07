import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.page.html',
  styleUrls: ['./manufacturer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ManufacturerPage implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  manufacturer_id: any = this.activatedRoute.snapshot.paramMap.get('manufacturer_id');
  manufacturer: any;

  ngOnInit() {
    this.getManufacturer(this.manufacturer_id);
  }

  getManufacturer(manufacturer_id: any) {
    this.api.manufacturer(manufacturer_id).subscribe((resp: any) => {
      this.manufacturer = resp.data;
      console.log(this.manufacturer);
    });
  }

  goProduct(product_id: any) {
    this.router.navigateByUrl('product/' + product_id);
  }

}
