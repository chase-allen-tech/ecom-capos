import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  orderForm: FormGroup;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditOrderComponent>,
    private fb: FormBuilder
  ) {
    this.orderForm=this.fb.group({
      billNo:[data.order.billNo],
      supplier: [data.order.supplier],
      phone: [data.order.phone],
      dateTime: [data.order.dateTime],
      totalProducts: [data.order.totalProducts],
      totalAmount: [data.order.totalAmount],
      paidStatus: [data.order.paidStatus],
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.orderForm.valid){
      let bResult=false;
      const orderData=this.orderForm.value;
      if(this.data.action==='edit'){
        //TODO: save changed order
      }
      else if(this.data.action==='add'){
        //TODO: add new order
      }
      if(bResult){
        this.dialogRef.close(orderData);
        return;
      }
    }
    this.dialogRef.close();
  }

}
