import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
