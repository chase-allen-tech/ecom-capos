import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-discount-dlg',
  templateUrl: './discount-dlg.component.html',
  styles: [
  ]
})
export class DiscountDlgComponent implements OnInit {

  submitted: boolean;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DiscountDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.submitted = true;
    if (!this.data.value) {
      return;
    }
    this.dialogRef.close(this.data);
  }

  selectSymbol(symbol): void {
    this.data.symbol = symbol;
  }

  applyDiscount(): void {
    this.dialogRef.close(this.data);
  }
}
