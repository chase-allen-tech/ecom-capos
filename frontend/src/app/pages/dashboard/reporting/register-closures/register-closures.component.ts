import { Component, OnInit } from '@angular/core';
import { IRegisterClosure } from '@app/_models/register-closure';

@Component({
  selector: 'app-register-closures',
  templateUrl: './register-closures.component.html',
  styleUrls: ['./register-closures.component.scss']
})
export class RegisterClosuresComponent implements OnInit {
  pageData:IRegisterClosure[]=[
    {
      register: 'reg 1',
      timeOpened: '23:34:11',
      timeClosed: '33:33:44',
      storeCredit: 234.4,
      cashConcealed: 2444.4,
      cash: 222,
      creditCard: 3432,
    },
    {
      register: 'reg 1',
      timeOpened: '23:34:11',
      timeClosed: '33:33:44',
      storeCredit: 234.4,
      cashConcealed: 2444.4,
      cash: 222,
      creditCard: 3432,
    },
    {
      register: 'reg 1',
      timeOpened: '23:34:11',
      timeClosed: '33:33:44',
      storeCredit: 234.4,
      cashConcealed: 2444.4,
      cash: 222,
      creditCard: 3432,
    },

  ];

  displayedColumns=[
    'register', 
    'timeOpened', 
    'timeClosed', 
    'storeCredit', 
    'cashConcealed', 
    'cash', 
    'creditCard',
    'total'
  ];
  constructor() { }

  ngOnInit(): void {
  }

  getTotal(row){
    return row.storeCredit+row.cashConcealed+row.cash+row.creditCard;
  }

}
