import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-price-book',
  templateUrl: './delete-price-book.component.html',
  styleUrls: ['./delete-price-book.component.scss']
})
export class DeletePriceBookComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeletePriceBookComponent>,
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
