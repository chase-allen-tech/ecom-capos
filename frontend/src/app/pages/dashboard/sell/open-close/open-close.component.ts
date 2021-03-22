import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.scss']
})
export class OpenCloseComponent implements OnInit {
  float: string='';
  note: string='';
  error: string='';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  openRegister(){
    if(this.float===''){
      this.error="Must input a opening float.";
      return;
    }
    else{
      localStorage.setItem("Open", "true");
      //TODO: opening register
      // var a = document.getElementsByClassName("mat-list-item-content")[3];
      // a.click();
      // this.router.navigate(['dashboard/sell/selling']);

      // // Change the url of "/dashboard/sell/open" to "close"
      // a = document.querySelectorAll('[href="/dashboard/sell/open"]')[2]
      // a.href = "/dashboard/sell/close";
    }
  }
}
