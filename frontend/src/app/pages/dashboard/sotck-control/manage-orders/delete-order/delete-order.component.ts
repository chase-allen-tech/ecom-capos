import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteOrderComponent>,
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
