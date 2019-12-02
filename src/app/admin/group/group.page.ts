import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  users: any;
  silver_users: any;
  gold_users: any;
  platinum_users: any;
  pageType: any;

  constructor(public authService: AuthService, public userService: UserService, private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.pageType = this.activatedRoute.snapshot.paramMap.get('type');

    this.userService.users$.subscribe(users => {
      this.users = [];

      users.forEach(item => {
        if (!item.photoUrl) {
          item.photoUrl = "https://picsum.photos/id/524/200/300";
        }

        if (this.pageType === "Total") {
          this.users.push(item)
        } else if (item.type === this.pageType) {
          this.users.push(item);
        }
      });
    });
  }

  goUserDetail(user: any) {
    this.router.navigateByUrl(`/admin/users/${user.id}`);
  }
}
