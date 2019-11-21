import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('/home/recipes');
  }

}
