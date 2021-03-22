import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  gatewayForm:FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.gatewayForm=this.fb.group({
      secretKey:[''],
      appKey: [''],
    });
  }

  ngOnInit(): void {
  }

  save(){
    if(this.gatewayForm.valid){
      //TODO: submit account data to backend.
    }
  }
}
