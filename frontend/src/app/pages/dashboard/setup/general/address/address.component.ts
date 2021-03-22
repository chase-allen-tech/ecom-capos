import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import {CountryList} from '@config/country';
import { UtilService } from '@service/util.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  countries=[
    {
        code: 'USA',
        name: 'USA',
        lang: 'en-US'
    },
    {
        code: 'CA',
        name: 'Canada',
        lang: 'en-CA'
    },
    {
        code: 'RU',
        name: 'Russia',
        lang: 'ru'
    }
];;
  addressForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
  ) {
    this.addressForm=this.fb.group({
      street1:[''],
      city1: [''],
      suburb1: [''],
      postcode1: [''],
      state1:[''],
      country1:[''],
      street2:[''],
      city2: [''],
      suburb2: [''],
      postcode2: [''],
      state2:[''],
      country2:[''],
    });
  }

  ngOnInit(): void {
    var luser = localStorage.getItem("currentUser");
    var user = JSON.parse(luser);

    this.utilService.get('generalsetting/read_data', {_id: user.user_id}).subscribe(response => {
      var data = response.body;
        this.addressForm=this.fb.group({
          street1: data["street_address"],
          city1: data['city'],
          suburb1: data['suburb'],
          postcode1: data['postcode'],
          state1: data['state'],
          country1: data['country'],
          street2: data['p_street_address'],
          city2: data['p_city'],
          suburb2: data['p_suburb'],
          postcode2: data['p_postcode'],
          state2:data['p_state'],
          country2:data['p_country'],
        });
      });
  }

  submit(){
    if(this.addressForm.value){
      var user = localStorage.getItem("currentUser");
      var user_id = JSON.parse(user).user_id;

      this.utilService.put('generalsetting/update_data', {_id: user_id, payload: this.addressForm.value}).subscribe(response => {
      });
    }
  }

  cancel(){
    //TODO:   cancel action
  }
}
