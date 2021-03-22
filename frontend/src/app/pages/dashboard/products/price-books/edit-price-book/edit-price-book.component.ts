import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomerGroup } from '@app/_models/customer-group';
import { IOutlet } from '@app/_models/outlet';

@Component({
  selector: 'app-edit-price-book',
  templateUrl: './edit-price-book.component.html',
  styleUrls: ['./edit-price-book.component.scss']
})
export class EditPriceBookComponent implements OnInit {
  bookForm: FormGroup;
  customerGroups:ICustomerGroup[]=[
    {
      name: 'All Customers',
      createdDate: '12/11/2020'
    },
    {
      name: 'Them',
      createdDate: '12/11/2020'
    },
    {
      name: 'XXxx',
      createdDate: '12/11/2020'
    },
    {
      name: 'Our',
      createdDate: '12/11/2020'
    },
    {
      name: 'Our',
      createdDate: '12/11/2020'
    },
  ];
  
  outlets:IOutlet[]=[
    {
      name: 'All Outlets'
    },
    {
      name: 'Outlet A'
    }
  ];
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditPriceBookComponent>,
    private fb: FormBuilder
  ) {
    this.bookForm=this.fb.group({
      name:[data.pb.name],
      customerGroup:[data.pb.customerGroup],
      outlet:[data.pb.outlet],
      validFrom:[data.pb.validFrom],
      validTo:[data.pb.validTo],
      createdAt:[data.pb.createdDate],
      bookFile:[''],
    });
  }

  ngOnInit(): void {
  }

  doAction(){
    if(this.bookForm.valid){
      let bResult=false;
      const paymentData=this.bookForm.value;
      if(this.data.action==='edit'){
        //TODO: save changed payment
      }
      else if(this.data.action==='add'){
        //TODO: add new payment
      }
      if(bResult){
        this.dialogRef.close(paymentData);
        return;
      }
    }
    this.dialogRef.close();
  }

}
