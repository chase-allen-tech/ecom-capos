import { Component, OnInit } from '@angular/core';
import { IOrderDetail } from '@app/_models/order-detail';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit {
  keyword='';
  
  orderData:IOrderDetail[]=[
    {
      id: '4017',
      date: 'Fri, Dec 21 2020',
      status: 'shipped',
      paymentStatus: 'unpaied',
      total: 731.1
    },
    {
      id: '4017',
      date: 'Fri, Dec 21 2020',
      status: 'quote',
      paymentStatus: 'fullypaied',
      total: 731.1
    },
    {
      id: '4017',
      date: 'Fri, Dec 21 2020',
      status: 'allocated',
      paymentStatus: 'unpaied',
      total: 731.1
    },
    {
      id: '4017',
      date: 'Fri, Dec 21 2020',
      status: 'shipped',
      paymentStatus: 'partiallypaied',
      total: 731.1
    }
  ];

  displayedColumns=['id', 'date', 'status', 'paymentStatus', 'total'];
  constructor() { }

  ngOnInit(): void {
  }

  import(){

  }

  addNew(){

  }

  search(){

  }
  
  getLink(order:IOrderDetail):string{
    return '/dashboard/ecommerce/orders/detail?id='+order.id;
  }

  getStatusText(order:IOrderDetail):string{
    const s=order.status;
    if(s=='shipped'){
      return 'Shipped';
    }
    else if(s=='quote'){
      return 'Quote'
    }
    else if(s=='allocated'){
      return 'Allocated';
    }
    else{
      return 'Unknown';
    }
  }

  getPaymentStatusText(order:IOrderDetail):string{
    const s=order.paymentStatus;
    if(s=='unpaied')
      return 'Unpaied';
    else if(s=='fullypaied')
      return 'Fully Paied';
    else if(s=='partiallypaied')
      return 'Partially Paid';
    else
      return 'Unknown';
  }
}
