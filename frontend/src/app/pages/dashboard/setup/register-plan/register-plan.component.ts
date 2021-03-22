import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-plan',
  templateUrl: './register-plan.component.html',
  styleUrls: ['./register-plan.component.scss']
})
export class RegisterPlanComponent implements OnInit {
  plan='';

  monthList=[1,2,3,4,5,6,7,8,9,10,11,12];
  yearList=[2020,2021,2022,2023,2024,2025,2026,2027];
  stateList=['CA', 'CT', 'DC'];
  countryList=['Canada', 'US', 'UK'];
  cardList=['Visa', 'MasterCard', 'Discover'];

  paymentForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.paymentForm=fb.group({
      firstName:[''],
      lastName: [''],
      cardType:[''],
      cardNumber:[''],
      expireMonth:[''],
      expireYear:[''],
      cvv:[''],
      amount:[0],

      address1:[''],
      address2:[''],
      city:[''],
      zipCode:[''],
      state:[''],
      country:[''],
      phone:['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      if (data) {
        this.plan=data.plan;
        console.log(this.plan);
      }
    });
  }

  goBack(){
    this.location.back();
  }

  submit(){
    
  }
}
