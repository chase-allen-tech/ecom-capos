import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  form:FormGroup;
  action='';

  collectionList=['Shoes', 'Shirt'];

  constructor(
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditCollectionComponent>
  ) {
    this.form=fb.group({
      id: [data.collection.id],
      name: [data.collection.name],
      description: [data.collection.description],
      parent: [data.collection.parent],
      image: [''],
      visible: [data.collection.visible]
    });
    this.action=data.action;
   }

  ngOnInit(): void {
  }

  doAction(){
    if(this.form.valid){
      let bResult=false;
      const editedData=this.form.value;
      if(this.action==='edit'){
        //TODO: save changed group
      }
      else if(this.action==='add'){
        //TODO: add new group
      }
      if(bResult){
        this.dialogRef.close(editedData);
        return;
      }
    }
    this.dialogRef.close();
  }
}
