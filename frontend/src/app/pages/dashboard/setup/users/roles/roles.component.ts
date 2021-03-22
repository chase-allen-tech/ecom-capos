import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  pageData=[
    {
      name: 'Alex',
      role: 'admin'
    },
    {
      name: 'Maria',
      role: 'guest'
    },
    {
      name: 'Tom',
      role: 'user'
    }
  ];

  displayedColumns=['name', 'role'];
  constructor() { }

  ngOnInit(): void {
  }

  addRole(){
    
  }
}
