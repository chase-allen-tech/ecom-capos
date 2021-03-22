import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-item-dlg',
  templateUrl: './new-item-dlg.component.html',
  styleUrls: ['./new-item-dlg.component.scss']
})
export class NewItemDlgComponent implements OnInit {
  submitted: boolean;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewItemDlgComponent>,
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
}
