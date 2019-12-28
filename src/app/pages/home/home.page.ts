import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page_title: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  setTitle() {
    console.log(this.router.url);
    switch (this.router.url) {
      case '/home/today':
        this.page_title = 'Home';
        break;
      case '/home/mylist':
        this.page_title = 'Shopping List';
        break;
      case '/home/recipes':
        this.page_title = 'Recipes';
        break;
      case '/home/profile':
        this.page_title = 'Profile';
        break;
      default:
        this.page_title = 'Home';
        break;
    }
  }

}
