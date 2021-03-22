import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISaleItem } from '@app/_models/sale-item';

@Component({
  selector: 'app-continue-sale',
  templateUrl: './continue-sale.component.html',
  styleUrls: ['./continue-sale.component.scss']
})
export class ContinueSaleComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns = ['receipt', 'customer', 'soldBy', 'note', 'soldTotal', 'status'];
  salesData:ISaleItem[]=[
    {
      receipt: 'Receipt 01',
      customer: 'xxxx',
      soldBy: 'yyy',
      note: 'sososososos',
      soldTotal: 4.5,
      status: 'active'
    },
    {
      receipt: 'Receipt 01',
      customer: 'xxxx',
      soldBy: 'yyy',
      note: 'sososososos',
      soldTotal: 4.5,
      status: 'active'
    },
    {
      receipt: 'Receipt 01',
      customer: 'xxxx',
      soldBy: 'yyy',
      note: 'sososososos',
      soldTotal: 4.5,
      status: 'active'
    },
    {
      receipt: 'Receipt 01',
      customer: 'xxxx',
      soldBy: 'yyy',
      note: 'sososososos',
      soldTotal: 4.5,
      status: 'active'
    },
    {
      receipt: 'Receipt 01',
      customer: 'xxxx',
      soldBy: 'yyy',
      note: 'sososososos',
      soldTotal: 4.5,
      status: 'active'
    },

  ];
  constructor(
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.searchForm = this.fb.group({
      customer: [''],
      status: ['active']
    });

  }

  ngOnInit(): void {
  }

  search(){
    //TODO: search sales history with customer and status
    console.log(this.searchForm.value.customer, this.searchForm.value.status);
  }
}
