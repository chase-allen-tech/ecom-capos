import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from '@service/util.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
  ) {
    this.contactForm=this.fb.group({
      contactName:[''],
      phone: ['+1 '],
      profileImage: [''],
      website: ['http://'],
      twitter:[''],
      ssss:['']
    });
  }

  ngOnInit(): void {
    var luser = localStorage.getItem("currentUser");
    var user = JSON.parse(luser);


    this.utilService.get('generalsetting/read_data', {_id: user.user_id}).subscribe(response => {
      var data = response.body;
      // console.log(data);
      this.contactForm=this.fb.group({
        contactName:  data["first_name"],
        phone: data['phone'],
        profileImage: data['profile_img'],
        website: data['website'],
        twitter: data['twitter'],
        ssss: ['']
      });
    });
  }

  submit(){
    if(this.contactForm.value){
      var user = localStorage.getItem("currentUser");
      var user_id = JSON.parse(user).user_id;

      this.utilService.put('generalsetting/update_data', {_id: user_id, payload: this.contactForm.value}).subscribe(response => {

      });
    }
  }

}
