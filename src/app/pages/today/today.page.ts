import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {

  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true
  };

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goProfile() {
    this.router.navigateByUrl('/home/profile');
  }

}
