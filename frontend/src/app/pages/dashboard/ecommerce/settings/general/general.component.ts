import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  storeStatus=false;
  accountForm:FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.accountForm=this.fb.group({
      storeName:[''],
      storeEmail: [''],
      logoFile: [''],
      bannerFile: ['']
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.accountForm.valid){
      //TODO: submit account data to backend.
    }
  }
}
