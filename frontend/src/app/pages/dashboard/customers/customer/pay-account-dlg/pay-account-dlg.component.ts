import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pay-account-dlg',
  templateUrl: './pay-account-dlg.component.html',
  styleUrls: ['./pay-account-dlg.component.scss']
})
export class PayAccountDlgComponent implements OnInit {

  submitted: boolean;
  types = ['Cash', 'Credit Card', 'Master Card', 'Store Credit'];
  registers = ['Main Register'];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<PayAccountDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  payBalance(): void {
    this.submitted = true;
    if (this.data.amount < 0) {
      return;
    }
    this.dialogRef.close(this.data);
  }

}
