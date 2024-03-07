import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ProductPage {

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private preferences: PreferencesService
  ) { }

  product_id: any = this.activatedRoute.snapshot.paramMap.get('product_id');
  product: any;
  questions: any = [];
  option1: any;
  option2: any;
  result: any;
  selection: any;

  user: any;
  access_token: any;

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
    this.getProduct(this.product_id);
  }

  getProduct(product_id: any) {
    this.loadingController.create().then((loading) => {
      this.api.product(product_id).subscribe((resp: any) => {
        loading.dismiss();
        this.product = resp;
        this.questions = Object.values(this.product.questions);
      });
    });
  }

  filter() {
    this.loadingController.create().then((loading) => {
      let data = {
        product_id: this.product_id,
        option1: this.option1
      }
      this.api.filter(data).subscribe((resp: any) => {
        loading.dismiss();
        if (resp.length != 0) {
          this.questions[1] = Object.values(resp);;
        }
      });
    });
  }

  search() {
    this.loadingController.create().then((loading) => {
      loading.present();
      let data = {
        product_id: this.product_id,
        option1: this.option1,
        option2: this.option2
      }
      this.api.search(data).subscribe((resp: any) => {
        loading.dismiss();
        this.selection = resp;
        console.log(this.selection);
      });
    });
  }

  order() {
    this.alertController.create({
      header: 'Success!',
      subHeader: 'The quote request has been sent.',
      message: 'Wait for our commercial contact.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        }
      ]
    }).then((alert: any) => {
      alert.present();
    });
  }

}
