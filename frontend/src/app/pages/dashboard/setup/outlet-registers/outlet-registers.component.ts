import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UtilService} from '@service/util.service';

@Component({
  selector: 'app-outlet-registers',
  templateUrl: './outlet-registers.component.html',
  styleUrls: ['./outlet-registers.component.scss']
})
export class OutletRegistersComponent implements OnInit {
  pageData=[
    {
      outletName: 'outlet 1',
      defaultTax: 'tax A',
      registers: '1111sff',
      status: 'adtive',
      details: 'sososososo',
    },
    {
      outletName: 'outlet 1',
      defaultTax: 'tax A',
      registers: '1111sff',
      status: 'adtive',
      details: 'sososososo',
    },
    {
      outletName: 'outlet 1',
      defaultTax: 'tax A',
      registers: '1111sff',
      status: 'adtive',
      details: 'sososososo',
    },
    {
      outletName: 'outlet 1',
      defaultTax: 'tax A',
      registers: '1111sff',
      status: 'adtive',
      details: 'sososososo',
    },

  ];

  displayedColumns=['outletName', 'defaultTax', 'registers', 'status', 'details'];

  constructor(
    private router: Router,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    var luser = localStorage.getItem("currentUser");
    var user = JSON.parse(luser);

    this.utilService.get('generalsetting/read_all_data').subscribe(response => {
      
      var outlets = response.body;
      console.log(outlets);
      var array_data = []

      for(var i = 0; i < outlets.length; i ++) {
        array_data[i] = {outletName: outlets[i].first_name, 
          defaultTax: outlets[i]["sales_tax"]["percentage"],
          registers: "01010101",
          status: outlets[i]["outlet"]["status"],
          details: "sssss"
        };
      }
      this.pageData = array_data;
      
    });
  }

  addOutlet(){
    this.router.navigate(['dashboard/setup/outlets/edit-outlet']);
  }

  addReceiptTemplate(){
    //TODO: add receipt template
  }
}
