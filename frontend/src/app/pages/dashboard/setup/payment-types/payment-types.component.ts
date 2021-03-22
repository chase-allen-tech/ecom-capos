import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '@app/_services/toast.service';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

@Component({
  selector: 'app-payment-types',
  templateUrl: './payment-types.component.html',
  styleUrls: ['./payment-types.component.scss']
})
export class PaymentTypesComponent implements OnInit {
  pageData=[
    {
      name: 'Payment type 1',
    },
    {
      name: 'Payment type 2',
    },
    {
      name: 'Payment type 3',
    },
    {
      name: 'Payment type 4',
    },

  ];

  displayedColumns=['name', 'action'];


  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  addPaymentType(){
    const dialogRef = this.dialog.open(EditPaymentComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        payment: {
          name: '',
        }, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly added new payment type.', 'New Payment Type');
      }
    });

  }

  editPaymentType(payment){
    const dialogRef = this.dialog.open(EditPaymentComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        payment: payment, 
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly saved payment type.', 'Edit Payment Type');
      }
    });
  }

  deletePaymentType(payment){
    const dialogRef = this.dialog.open(DeletePaymentComponent, {
      width: '600px',
      height: 'auto',
      data: {
        payment: payment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==='delete') {
        //TODO: delete order data

      }
    });
  }



}
