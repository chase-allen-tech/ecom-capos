import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  order={
    id:'',
    productName:"Los Pollos Hermanos Fry Batter",
    quantity:1,
    price:99.99,
    cartSubtotal:99.99,
    shipping:'Free Shipping',
    orderTotal:99.99
  };

  customer={
    email: 'waiter@ww.com',
    tel: '555-5555-1234'
  };

  Billing={
    a1:'Waiter White',
    a2:'308 Negra Arroyo Lane',
    a3:'Albuquerque, New Mexico 87104'
  };
  Shipping={
    a1:'Waiter White',
    a2:'308 Negra Arroyo Lane',
    a3:'Albuquerque, New Mexico 87104'
  };

  constructor(
    private router: ActivatedRoute,
    private location: Location,
  ) {
    router.queryParams.subscribe(query => {
      this.order.id = query.id;
    });
  }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }
}
