import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../../_services/util.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  verifyStatus: boolean;
  private hash: any;

  constructor(private utilService: UtilService, private router: ActivatedRoute) {
    this.hash = this.router.snapshot.params.hash;
    this.utilService.post('auth/verify-email', {fakeToken: this.hash}).subscribe(result => {
      this.verifyStatus = result;
    });
  }

  ngOnInit(): void {
  }

}
