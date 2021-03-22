import { Component, OnInit } from '@angular/core';
import { IPaymentSummary } from '@app/_models/payment-summary';
import { ToastService } from '@app/_services/toast.service';
import {UtilService} from '@service/util.service';


@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})

export class CloseComponent implements OnInit {
  outlet: string='data';
  register: string='data';
  closure: string='data';

  displayedColumns = ['type', 'expected', 'counted', 'differences'];
  paymentData: IPaymentSummary[]=[
    {
      type: 'payment 1',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 2',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 3',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 4',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 5',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 1',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 2',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 3',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 4',
      expected: '-',
      counted: 0,
      differences: 0
    },
    {
      type: 'payment 5',
      expected: '-',
      counted: 0,
      differences: 0
    },

  ];
  constructor(
    private toastService: ToastService,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.utilService.get("/close").subscribe(res => {
      console.log(res);
    });
  }

  calcTotal():string|number {
    //TODO: calculate total value.
    console.log('calculating total...');
    
    return '100.00';
  }

  registerSell(){
    //TODO: register sell
    console.log('register sell...');
  }

  closeRegister(){
    this.toastService.showSuccess('Closed registration successfully.', 'Sell Register')
  }
}
