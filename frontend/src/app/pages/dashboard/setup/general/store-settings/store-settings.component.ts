import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICurrency } from '@app/_models/currency';
import { ITax } from '@app/_models/tax';
import {UtilService} from '@service/util.service';

@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.scss']
})
export class StoreSettingsComponent implements OnInit {
  currencies:ICurrency[]=[
    {
      name: 'USD',
      rate: 1.0
    },
    {
      name: 'CAD',
      rate: 0.78
    },
    {
      name: 'INR',
      rate: 0.014
    }
  ];

  taxes:ITax[]=[
    {
      name: 'Tax 1',
      tax: 12,
      amount: 1000
    },
    {
      name: 'Tax 2',
      tax: 12,
      amount: 1000
    },
    {
      name: 'demo',
      tax: 12,
      amount: 1000
    }
  ];

  storeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
  ) {
    this.storeForm=this.fb.group({
      storeName:[''],
      privateUrl: ['http://'],
      defaultCurrency: ['USD'],
      defaultTax: [''],
      receiptTemplate:[''],
      sequenceNumber: ['1'],
      switchCurrency: [''],
    });

  }


  

  ngOnInit(): void {
    // this.storeForm=this.fb.group({
    //   storeName:[''],
    //   privateUrl: ['http://'],
    //   defaultCurrency: ['USD'],
    //   defaultTax: [''],
    //   receiptTemplate:[''],
    //   sequenceNumber: [''],
    //   switchCurrency: [''],
    // });

    var luser = localStorage.getItem("currentUser");
    var user = JSON.parse(luser);
    console.log(user);

    this.utilService.get('generalsetting/read_data', {_id: user.user_id}).subscribe(response => {
      var data = response.body;
      this.utilService.get('countries/get_countries').subscribe(res => {
        var countries = res.body;
        var currencies = []

        for(var i = 0; i < countries.length; i ++) {
          currencies[i] = {name: countries[i].currency_code, rate: 1.0};
        }
        this.currencies = currencies;
        console.log(data["sales_tax"]);
        this.storeForm=this.fb.group({
          storeName: data["store_name"],
          privateUrl: data["private_web_address"],
          defaultCurrency: data["currency_code"],
          defaultTax: data["sales_tax"]["tax_name"],
          receiptTemplate: data["receipt_name"],
          sequenceNumber: ['1'],
          switchCurrency: [''],
        });
      });
    });
    
  }


  submit(){
    if(this.storeForm.value){
      var user = localStorage.getItem("currentUser");
      var user_id = JSON.parse(user).user_id;

      this.utilService.put('generalsetting/update_data', {_id: user_id, payload: this.storeForm.value}).subscribe(response => {

      });
    }
  }
}
