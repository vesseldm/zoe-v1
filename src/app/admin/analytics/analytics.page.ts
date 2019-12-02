import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;

  private barChart: Chart;
  private lineChart: Chart;

  user: any;
  userBillingEditable: boolean;
  rewardsEditable: boolean;
  rewards: any;
  users: any;
  silver_users: any;
  gold_users: any;
  platinum_users: any;

  constructor(public userService: UserService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if (user) this.user = user;
    });

    this.userService.users$.subscribe(users => {
      this.users = users;
      this.silver_users = [];
      this.gold_users = [];
      this.platinum_users = [];

      users.forEach(item => {
        if (!item.photoUrl) {
          item.photoUrl = "https://picsum.photos/id/524/200/300";
        }
        switch (item.type) {
          case "Silver":
            this.silver_users.push(item);
            break;

          case "Gold":
            this.gold_users.push(item);
            break;

          case "Platinum":
            this.platinum_users.push(item);
            break;

          default:
            break;
        }
      });
    });

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
        datasets: [
          {
            data: [60, 65, 35, 70, 83, 15, 48],
            backgroundColor: "#f8e71c",
            borderColor: "#f8e71c",
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 0.8,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            },
          ]
        }
      }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
        datasets: [
          {
            data: [60, 65, 35, 70, 83, 15, 48, 60, 65, 35, 70, 83, 40, 48, 60, 65, 35, 70, 83, 15, 48],
            backgroundColor: "#f8e71c",
            borderColor: "#f8e71c",
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 4,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true
              }
            },
          ]
        }
      }
    });
  }

  goGroupUsers(type: String) {
    this.router.navigateByUrl(`/admin/users/group/${type}`);
  }
}
