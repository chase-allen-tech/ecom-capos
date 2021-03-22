import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-type-dlg',
  templateUrl: './type-dlg.component.html',
  styleUrls: ['./type-dlg.component.scss']
})
export class TypeDlgComponent implements OnInit {

  submitted: boolean;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<TypeDlgComponent>,
  ) { }

  ngOnInit(): void {
  }

  handleItem(): void {
    this.submitted = true;
    this.dialogRef.close(this.data);
  }

}
