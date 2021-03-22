import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICashItem } from '@app/_models/cash-item';

@Component({
  selector: 'app-edit-cash',
  templateUrl: './edit-cash.component.html',
  styleUrls: ['./edit-cash.component.scss']
})
export class EditCashComponent implements OnInit {
  cashForm: FormGroup;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditCashComponent>,
    private fb: FormBuilder
  ) {
    this.cashForm=this.fb.group({
      date: [data.cash.date],
      user: [data.cash.user],
      reasons: [data.cash.reasons],
      transaction: [data.cash.transaction]
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.cashForm.valid){
      let bResult=false;
      const cashData=this.cashForm.value;
      if(this.data.action==='edit'){
        //TODO: save changed cash
      }
      else if(this.data.action==='add'){
        //TODO: add new cash
      }
      if(bResult){
        this.dialogRef.close(cashData);
        return;
      }
    }
    this.dialogRef.close();
  }
}
