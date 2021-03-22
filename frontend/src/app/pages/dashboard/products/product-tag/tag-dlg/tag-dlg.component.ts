import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-tag-dlg',
  templateUrl: './tag-dlg.component.html',
  styleUrls: ['./tag-dlg.component.scss']
})
export class TagDlgComponent implements OnInit {

  submitted: boolean;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<TagDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  handleItem(): void {
    this.submitted = true;
    this.dialogRef.close(this.data);
  }
}
