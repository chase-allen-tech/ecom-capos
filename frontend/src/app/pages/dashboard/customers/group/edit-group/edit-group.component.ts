import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  groupForm: FormGroup;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditGroupComponent>,
    private fb: FormBuilder
  ) {
    this.groupForm=this.fb.group({
      name:[data.group.name],
      createdDate: [data.group.createdDate],
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.groupForm.valid){
      let bResult=false;
      const groupData=this.groupForm.value;
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
