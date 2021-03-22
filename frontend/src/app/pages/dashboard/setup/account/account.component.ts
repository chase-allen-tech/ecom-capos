import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  plan='free';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  selectPlan(plan){
    $('.'+this.plan).removeClass('selected');
    this.plan=plan;
    $('.'+this.plan).addClass('selected');
  }

  register(){
    this.router.navigate(['dashboard/setup/register-plan'], {queryParams:{plan: this.plan}});
  }
}
