import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {

  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

}
