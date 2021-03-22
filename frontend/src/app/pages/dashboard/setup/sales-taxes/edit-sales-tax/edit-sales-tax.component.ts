import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-sales-tax',
  templateUrl: './edit-sales-tax.component.html',
  styleUrls: ['./edit-sales-tax.component.scss']
})
export class EditSalesTaxComponent implements OnInit {
  taxForm: FormGroup;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditSalesTaxComponent>,
    private fb: FormBuilder
  ) {
    this.taxForm=this.fb.group({
      name:[data.tax.name],
      rate: [data.tax.rate],
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.taxForm.valid){
      let bResult=false;
      const groupData=this.taxForm.value;
      if(this.data.action==='edit'){
        //TODO: save changed group
      }
      else if(this.data.action==='add'){
        //TODO: add new group
      }
      if(bResult){
        this.dialogRef.close(groupData);
        return;
      }
    }
    this.dialogRef.close();
  }

}
