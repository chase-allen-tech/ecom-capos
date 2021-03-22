import { Component, OnInit } from '@angular/core';
import { ITax } from '@app/_models/tax';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  pageData:ITax[]=[
    {
      name: 'Tax 1',
      amount: 1000,
      tax: 100,
    },
    {
      name: 'Tax 1',
      amount: 1000,
      tax: 100,
    },
    {
      name: 'Tax 1',
      amount: 1000,
      tax: 100,
    },
    {
      name: 'Tax 1',
      amount: 1000,
      tax: 100,
    },
    {
      name: 'Tax 1',
      amount: 1000,
      tax: 100,
    },
  ];

  displayedColumns=['name', 'amount', 'tax'];
  constructor() { }

  ngOnInit(): void {
  }

  moreOptions(){

  }

  addTax(){

  }
}
