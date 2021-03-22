import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  status=false;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusString(){
    if(this.status){
      return 'On';
    }
    else{
      return 'Off';
    }
  }
}
