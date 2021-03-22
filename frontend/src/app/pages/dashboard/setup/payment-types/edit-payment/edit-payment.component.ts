import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditPaymentComponent>,
    private fb: FormBuilder
  ) {
    this.paymentForm=this.fb.group({
      name:[data.payment.name],
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.paymentForm.valid){
      let bResult=false;
      const paymentData=this.paymentForm.value;
      if(this.data.action==='edit'){
        //TODO: save changed payment
      }
      else if(this.data.action==='add'){
        //TODO: add new payment
      }
      if(bResult){
        this.dialogRef.close(paymentData);
        return;
      }
    }
    this.dialogRef.close();
  }

}
