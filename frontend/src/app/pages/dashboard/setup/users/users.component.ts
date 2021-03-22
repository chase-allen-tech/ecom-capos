import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  navs=[
    {
      name: 'Users',
      link: 'users'
    },
    {
      name: 'Roles',
      link: 'roles'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
