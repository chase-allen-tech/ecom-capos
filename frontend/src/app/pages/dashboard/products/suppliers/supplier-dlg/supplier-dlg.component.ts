import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-dlg',
  templateUrl: './supplier-dlg.component.html',
  styleUrls: ['./supplier-dlg.component.scss']
})
export class SupplierDlgComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SupplierDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  handleItem(): void {
    this.dialogRef.close(this.data);
  }

}
