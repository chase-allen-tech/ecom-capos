import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-brand-dlg',
  templateUrl: './brand-dlg.component.html',
  styleUrls: ['./brand-dlg.component.scss']
})
export class BrandDlgComponent implements OnInit {

  submitted: boolean;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<BrandDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  toUpperCase(str): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  handleItem(): void {
    this.submitted = true;
    this.dialogRef.close(this.data);
  }

}
