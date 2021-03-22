import { Component, OnInit } from '@angular/core';
import { IInventoryReport } from '@app/_models/inventory-report';

@Component({
  selector: 'app-inventory-reports',
  templateUrl: './inventory-reports.component.html',
  styleUrls: ['./inventory-reports.component.scss']
})
export class InventoryReportsComponent implements OnInit {
  keyword:string = '';
  inventoryData:IInventoryReport[]=[
    {
      product: 'aaaa',
      outlet: 'to zzzz',
      currentStock: 123,
      stockValue: 33,
      itemValue: 2,
      reorderPoint: 23,
      reorderAmount: 65
    },
    {
      product: 'bbb',
      outlet: 'to yyy',
      currentStock: 123,
      stockValue: 33,
      itemValue: 2,
      reorderPoint: 23,
      reorderAmount: 65
    },
    {
      product: 'cccc',
      outlet: 'to xxxx',
      currentStock: 123,
      stockValue: 33,
      itemValue: 2,
      reorderPoint: 23,
      reorderAmount: 65
    },
  ];
  displayedColumns=[
    'product', 'outlet', 'currentStock', 'stockValue', 
    'itemValue', 'reorderPoint', 'reorderAmount'
  ];
  constructor() { }

  ngOnInit(): void {
  }

  toExcel(){
    //TODO: export to excel
  }

  search(){
    //TODO: search inventory reports
  }

}
