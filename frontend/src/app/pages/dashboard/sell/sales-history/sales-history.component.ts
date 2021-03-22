import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  navs=[
    {
      name: 'All',
      link: 'all'
    },
    {
      name: 'Process Return',
      link: 'process-return'
    },
    {
      name: 'Continue Sale',
      link: 'continue-sale'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
