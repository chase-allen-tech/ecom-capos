import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeletePaymentComponent>,
  ) { }

  ngOnInit(): void {
  }
  cancel(){
    this.dialogRef.close('cancel');
  }

  delete(){
    this.dialogRef.close('delete');
  }
}
