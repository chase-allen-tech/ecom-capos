import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-item-dlg',
  templateUrl: './remove-item-dlg.component.html',
  styleUrls: ['./remove-item-dlg.component.scss']
})
export class RemoveItemDlgComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<RemoveItemDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  toUppercase(item: any): string {
    return item.slice(0, 1).toUpperCase() + item.slice(1, item.length);
  }

  handleItem(): void {
    this.dialogRef.close(this.data);
  }
}
