import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../_services/auth.service';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logOut();
  }
}
