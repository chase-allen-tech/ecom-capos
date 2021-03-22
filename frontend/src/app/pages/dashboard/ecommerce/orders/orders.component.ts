import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  navs=[
    {
      name: 'Open',
      link: 'open'
    },
    {
      name: 'Closed',
      link: 'closed'
    },
    {
      name: 'All',
      link: 'all'
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
