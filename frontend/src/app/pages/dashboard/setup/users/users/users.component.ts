import { Component, OnInit } from '@angular/core';
import { IUserSetting } from '@app/_models/user-setting';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  nameKey='';
  roleKey='';
  outletKey='';

  pageData:IUserSetting[]=[
    {
      id: 1,
      name: 'John',
      outlet: 'Outlet A',
      dailyTarget: 123,
      weeklyTarget: 234,
      monthlyTarget: 45,
      lastActive: '01/22/2021 12:34:36'
    },
    {
      id: 2,
      name: 'John',
      outlet: 'Outlet A',
      dailyTarget: 123,
      weeklyTarget: 234,
      monthlyTarget: 45,
      lastActive: '01/22/2021 12:34:36'
    },
    {
      id: 3,
      name: 'John',
      outlet: 'Outlet A',
      dailyTarget: 123,
      weeklyTarget: 234,
      monthlyTarget: 45,
      lastActive: '01/22/2021 12:34:36'
    },
    {
      id: 4,
      name: 'John',
      outlet: 'Outlet A',
      dailyTarget: 123,
      weeklyTarget: 234,
      monthlyTarget: 45,
      lastActive: '01/22/2021 12:34:36'
    }
  ];
  displayedColumns=[
    'name', 
    'outlet', 
    'dailyTarget', 
    'weeklyTarget', 
    'monthlyTarget', 
    'lastActive'
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addUser(){
    //TODO: add new user
  }

  search(){
    //TODO: search users
  }
}
