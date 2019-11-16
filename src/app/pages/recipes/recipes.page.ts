import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true
  };

  constructor() { }

  ngOnInit() {
  }

}
