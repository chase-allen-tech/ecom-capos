import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss']
})
export class PaymentReportsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  keyword = '';
  
  paymentData=[
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },
    {
      date: '12/22/2020',
      cash: 123,
      concealedTotal: 2344,
      creditCards: 2233.3,
    },

  ];
  displayedColumns=['date', 'cash', 'concealedTotal', 'creditCards', 'total'];

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    //TODO: search sales reports and update this.salesData
    console.log('search from', this.startDate, ' to ', this.endDate);
  }

  toExcel(){
    //TODO: export to excel
  }

  getPaymentTotal(payment){
    return payment.cash+payment.concealedTotal+payment.creditCards;
  }

  getTotalCash(){
    return this.getSum('cash');
  }

  getTotaConceled(){
    return this.getSum('cash');
  }

  getTotalCreditCards(){
    return this.getSum('cash');
  }

  getTotal(){
    let sum=0;
    const len=this.paymentData.length;
    for(let i=0; i<len; i++){
      sum+=(this.paymentData[i].cash+this.paymentData[i].concealedTotal+this.paymentData[i].creditCards);
    }
    return sum;
  }

  getSum(key){
    let sum=0;
    const len=this.paymentData.length;
    for(let i=0; i<len; i++){
      sum+=this.paymentData[i][key];
    }
    return sum;
  }

}
