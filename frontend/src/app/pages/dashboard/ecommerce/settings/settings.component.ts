import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  navs=[
    {
      name: 'General',
      link: 'general'
    },
    {
      name: 'Taxes',
      link: 'taxes'
    },
    {
      name: 'Payment Methods',
      link: 'payment-methods'
    },
    {
      name: 'Click & Collect',
      link: 'click-collect'
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
