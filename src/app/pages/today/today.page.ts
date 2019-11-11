import { Component, OnInit } from '@angular/core';
import { Tab1Page } from '../../tab1/tab1.page';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {

  tab1Root = Tab1Page;
  tab2Root = Tab1Page;
  tab3Root = Tab1Page;

  constructor() { }

  ngOnInit() {
  }

}
