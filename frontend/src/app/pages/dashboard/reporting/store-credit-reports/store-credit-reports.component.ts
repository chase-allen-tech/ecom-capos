import { Component, OnInit } from '@angular/core';
import { IStoreCredit } from '@app/_models/store-credit';

@Component({
  selector: 'app-store-credit-reports',
  templateUrl: './store-credit-reports.component.html',
  styleUrls: ['./store-credit-reports.component.scss']
})
export class StoreCreditReportsComponent implements OnInit {
  keyword='';
  pageData:IStoreCredit[]=[
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },
    {
      customer: 'XXxx',
      issued: 123,
      redeemed: 234,
      balance: 345,
    },

  ];
  displayedColumns=['customer', 'issued', 'redeemed', 'balance'];
  constructor() {}

  ngOnInit(): void {
  }

  getTotalIssued(){
    return this.getSum('issued');
  }

  getTotalRedeemed(){
    return this.getSum('redeemed');
  }

  getTotalBalance(){
    return this.getSum('balance');
  }

  getSum(key){
    let sum=0;
    const len=this.pageData.length;
    for(let i=0; i<len; i++){
      sum+=this.pageData[i][key];
    }
    return sum;
  }

  search(){
    //TODO: search stock credit reports...
  }
}
