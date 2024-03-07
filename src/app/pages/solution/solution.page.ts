import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.page.html',
  styleUrls: ['./solution.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SolutionPage {

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private preferences: PreferencesService
  ) { }

  solution_id: any = this.activatedRoute.snapshot.paramMap.get('solution_id');
  solution: any;

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
    this.getSolution(this.solution_id);
  }

  getSolution(solution_id: any) {
    this.api.solution(solution_id).subscribe((resp: any) => {
      this.solution = resp.data;
      console.log(this.solution);
    });
  }

  goProduct(product_id: any) {
    this.router.navigateByUrl('product/' + product_id);
  }

}
