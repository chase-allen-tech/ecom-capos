import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteGroupComponent>,
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
