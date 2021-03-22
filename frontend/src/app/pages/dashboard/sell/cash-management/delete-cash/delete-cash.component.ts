import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cash',
  templateUrl: './delete-cash.component.html',
  styleUrls: ['./delete-cash.component.scss']
})
export class DeleteCashComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteCashComponent>,
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
