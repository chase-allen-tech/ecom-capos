import { Component, OnInit } from '@angular/core';
import { ISalesLedger } from '@app/_models/sales-ledger';

@Component({
  selector: 'app-sales-ledger',
  templateUrl: './sales-ledger.component.html',
  styleUrls: ['./sales-ledger.component.scss']
})
export class SalesLedgerComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  salesData: ISalesLedger[] = [
    {
      date: '05/23/2020',
      user: 'Alex',
      register: 'sfsf',
      receipt: 'sfffsf',
      customer: 'Xyz',
      note: 'so so so',
      status: 'ok',
      total: 23.5
    },
    {
      date: '05/23/2020',
      user: 'Alex',
      register: 'sfsf',
      receipt: 'sfffsf',
      customer: 'Xyz',
      note: 'so so so',
      status: 'ok',
      total: 23.5
    },
    {
      date: '05/23/2020',
      user: 'Alex',
      register: 'sfsf',
      receipt: 'sfffsf',
      customer: 'Xyz',
      note: 'so so so',
      status: 'ok',
      total: 23.5
      },
    ];
    displayedColumns=['date', 'user', 'register','receipt', 'customer', 'status', 'total'];
  constructor() { }

  ngOnInit(): void {
  }

  search(){
    //TODO: search sales data from start date to end date
    console.log('search sales data from '+this.startDate+' to '+this.endDate+'.');
  }

}
