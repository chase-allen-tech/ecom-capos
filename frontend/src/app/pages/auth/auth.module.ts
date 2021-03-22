import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ShareModule} from '../../_shared/share.module';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent, VerifyEmailComponent],
  imports: [
    CommonModule,
    ShareModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
