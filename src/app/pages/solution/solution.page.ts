import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.page.html',
  styleUrls: ['./solution.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SolutionPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  solution_id: any = this.activatedRoute.snapshot.paramMap.get('solution_id');
  solution: any;

  ngOnInit() {
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
