import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@service/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '@service/toast.service';
import {Constants} from '@config/constant';
import {UtilService} from '@service/util.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  hide = true;
  signInForm: FormGroup;
  invalidEmailOrPwd: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private toastService: ToastService,
    private utilService: UtilService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.signInForm = this.formBuilder.group({
      private_web_address: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  signIn(): any {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.signIn(this.signInForm.value).subscribe(result => {
      if (result) {
        if (result.email_verify) {
          this.route.navigateByUrl('dashboard');
          this.toastService.showSuccess('You logged in successfully', 'Login success');
        } else {
          this.utilService.post('auth/send-email-verification', {email: result.email}).subscribe(response => {
            this.toastService.showFailed('Please verify your email', 'Login Failed');
          });
        }
      }
    }, error => {
      this.invalidEmailOrPwd = true;
      this.toastService.showFailed('User not found', 'Login Failed');
    });
  }

  get privateWebAddressInput(): any {return this.signInForm.get('private_web_address'); }
  get privateWebAddressInputError(): string {
    if (this.privateWebAddressInput.hasError('required')) {return 'Private web address is required'; }
    if (this.privateWebAddressInput.hasError('minlength')) {return 'This field must be longer than 8 letters'; }
  }

  get emailInput(): any {return this.signInForm.get('email'); }

  get emailInputError(): string {
    if (this.emailInput.hasError('email')) { return Constants.message.validEmail; }
    if (this.emailInput.hasError('required')) { return Constants.message.requiredEmail; }
  }

  get passwordInput(): any {return this.signInForm.get('password'); }

  get passwordInputError(): string {
    if (this.passwordInput.hasError('required')) { return Constants.message.requiredPwd; }
    if (this.passwordInput.hasError('minlength')) { return Constants.message.minLengthPwd; }
    if (this.passwordInput.hasError('maxlength')) { return Constants.message.maxLengthPwd; }
  }

}
