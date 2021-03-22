import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})
export class NewOrdersComponent implements OnInit {
  orderForm:FormGroup;
  orderList=['Peter', 'XXX'];
  destList=['mynew', 'onestore'];
  productList=['sweatshirt','adidas tshirt'];
  
  productData:IOrderProduct[]=[
    {
      name: 'ppp',
      quantity: 1,
      rate: 100
    }
  ];

  dataSource:MatTableDataSource<IOrderProduct>;
  displayColumns=['name','quantity','rate','amount','action'];

  grossAmount=0;
  sCharge=0;
  vat=0;
  discount=0;
  newAmount=0;

  constructor(
    private fb: FormBuilder
  ) {
    this.orderForm=this.fb.group({
      name:[''],
      time: ['01/27/2021 16:35'],
      orderFrom: [''],
      deliveryTo: [''],
      deliveryDue:[''],
      orderFile:[''],
      supplierName:[''],
      supplierAddress:[''],
      supplierPhone:[''],
      product: [],
      quantity: []
    });
    this.dataSource = new MatTableDataSource(this.productData);

    
  }
  ngOnInit(): void {
    
  }

  submit(){

  }

  addProduct(){
    this.productData.push({
      name: '',
      quantity: 1,
      rate:0
    });
    this.dataSource=new MatTableDataSource(this.productData);
  }

  removeProduct(product){
    const i=this.productData.indexOf(product);
    this.productData.splice(i, 1);
    this.dataSource._updateChangeSubscription();
  }

  create(){
    
  }
}

interface IOrderProduct{
  name: string;
  quantity: number;
  rate: number;
}
