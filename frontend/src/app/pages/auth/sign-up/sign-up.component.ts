import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../_services/auth.service';
import {ToastService} from '../../../_services/toast.service';
import {Constants} from '../../../_configs/constant';
import {UtilService} from '../../../_services/util.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  phoneNumber: string;
  isValidNumber = true;
  submitted: boolean;
  hide = true;
  countryList: any;
  duplicatedWebAdd: boolean;
  duplicatedStoreName: boolean;
  duplicatedEmail: boolean;
  private ipAddress: any;
  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    public authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.getCountryList();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.initForm();
  }

  initForm(): void {
    this.authService.ipAddress.subscribe(result => {
      this.ipAddress = result;
    });
    this.signUpForm = this.formBuilder.group({
      private_web_address: ['', [Validators.required, Validators.minLength(8)]],
      store_name: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', Validators.required],
      last_name: [''],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      currency_code: ['', Validators.required]
    });
  }

  getCountryList(): any {
    this.utilService.get('auth/country', '').subscribe(result => {
      this.countryList = result.body;
    });
  }

  get privateWebAddressInput(): any {return this.signUpForm.get('private_web_address'); }

  get privateWebAddressInputError(): string {
    if (this.privateWebAddressInput.hasError('required')) {return 'Private Web Address is required'; }
    else if (this.privateWebAddressInput.hasError('minlength')) {return 'This field must be more than 8 letters'; }
    else if (this.duplicatedWebAdd) {return 'This Web prefix is already in use'; }
  }

  get storeNameInput(): any {return this.signUpForm.get('store_name'); }

  get storeNameInputError(): string {
    if (this.storeNameInput.hasError('required')) { return 'Store Name is required'; }
    else if (this.storeNameInput.hasError('minlength')) {return 'This field must be more than 8 letters'; }
    else if (this.duplicatedStoreName) {return 'This Store Name is already in use'; }
  }

  get firstNameInput(): any {return this.signUpForm.get('first_name'); }

  get firstNameInputError(): string {
    if (this.firstNameInput.hasError('required')) { return 'First Name is required'; }
  }

  get cityInput(): any {return this.signUpForm.get('city'); }

  get cityInputError(): string {
    if (this.storeNameInput.hasError('required')) { return 'City is required'; }
  }

  get emailInput(): any {return this.signUpForm.get('email'); }
  get emailInputError(): string {
    if (this.emailInput.hasError('email')) { return Constants.message.validEmail; }
    else if (this.emailInput.hasError('required')) { return Constants.message.requiredEmail; }
    if (this.duplicatedEmail) {return Constants.message.duplicatedEmail; }
  }

  get phoneNumberInput(): any {return this.signUpForm.get('phone'); }
  get phoneNumberInputError(): any {
    if (this.phoneNumberInput.hasError('required')) { return 'Phone Number is required'; }
    if (!this.isValidNumber) { return 'Please enter valid phone number'; }
  }

  get passwordInput(): any {return this.signUpForm.get('password'); }
  get passwordInputError(): string {
    if (this.passwordInput.hasError('required')) { return Constants.message.requiredPwd; }
    if (this.passwordInput.hasError('minlength')) { return Constants.message.minLengthPwd; }
    if (this.passwordInput.hasError('maxlength')) { return Constants.message.maxLengthPwd; }
  }

  get currencyCodeInput(): any {return this.signUpForm.get('currency_code'); }

  get currencyCodeInputError(): string {
    if (this.storeNameInput.hasError('required')) { return 'Currency Code is required'; }
  }

  getPhoneNumber(event): any {
    this.phoneNumber = event;
  }

  hasPhoneNumberError(event): any {
    this.isValidNumber = event;
  }

  signUp(): any {
    this.submitted = true;
    if (this.signUpForm.invalid || !this.isValidNumber) {
      return;
    }
    this.signUpForm.value.ip_address = this.ipAddress;
    // Change phone number into country number + input value.
    this.signUpForm.value.phone = this.phoneNumber;
    this.authService.signUp(this.signUpForm.value).subscribe(result => {
      this.toastService.showSuccess('User registered successfully', 'Register Success');
    }, error => {
      if (error && error.status === 409) {
        if (error.error.keyPattern.private_web_address) {
          this.duplicatedWebAdd = true;
        }
        if (error.error.keyPattern.store_name) {
          this.duplicatedStoreName = true;
        }
        if (error.error.keyPattern.email) {
          this.duplicatedEmail = true;
        }
      }
      this.toastService.showFailed('Please check your information', 'Register Failed');
    });
  }

}
