import { getUrlScheme } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ISalesReport } from '@app/_models/sales-report';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';

  salesData:ISalesReport[] = [
    {
      date: '04/21',
      totals: 120,
      revenue: 20,
      costOfGoods: 100,
      grossProfit: 123,
      margin: 3,
      tax: 2,
    },
    {
      date: '04/22',
      totals: 120,
      revenue: 20,
      costOfGoods: 100,
      grossProfit: 123,
      margin: 3,
      tax: 2,
    },
    {
      date: '04/23',
      totals: 120,
      revenue: 20,
      costOfGoods: 100,
      grossProfit: 123,
      margin: 3,
      tax: 2,
    },
  ];
  displayedColumns=['date', 'totals', 'revenue', 'costOfGoods', 'grossProfit', 'margin', 'tax'];

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    //TODO: search sales reports and update this.salesData
    console.log('search from', this.startDate, ' to ', this.endDate);
  }

  getTotal(){
    return this.getSum('totals');
  }

  getTotalRevenue(){
    return this.getSum('revenue');
  }

  getTotalCost(){
    return this.getSum('costOfGoods');
  }

  getTotalProfit(){
    return this.getSum('grossProfit');
  }

  getTotalMargin(){
    return this.getSum('margin');
  }

  getTotalTax(){
    return this.getSum('tax');
  }

  getSum(key){
    let sum=0;
    const len=this.salesData.length;
    for(let i=0; i<len; i++){
      sum+=this.salesData[i][key];
    }
    return sum;
  }
}
