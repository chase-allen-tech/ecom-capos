import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {AuthService} from '@service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {postalAddress} from '@page/dashboard/products/suppliers/supplier-action/supplier-action.component';
import * as UtilFunc from '@helper/util.helper';

@Component({
  selector: 'app-customer-action',
  templateUrl: './customer-action.component.html',
  styleUrls: ['./customer-action.component.scss']
})
export class CustomerActionComponent implements OnInit {
  util = UtilFunc;
  customerForm: FormGroup;
  countries = [];
  existPostalAddress: boolean;
  user: any;
  mode: string;
  customer: any;
  customerId = '';
  groups = [];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastService,
    private authService: AuthService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.router.queryParams.subscribe(query => {
      if (query && query.mode === 'add') {
        this.mode = 'add';
      } else if (query.mode === 'edit') {
        const keysToRemove = ['_id', 'store_name', 'user_id', '__v', 'account',
        'total_spent', 'store_credit', 'total_issued', 'total_redeemed', 'is_deleted', 'created_at'];
        this.mode = 'edit';
        const data = {range: '_id', _id: query.id};
        this.utilService.get('customers/customer', data).subscribe(result => {
          this.customer = result.body;
          this.customerId = this.customer._id;
          keysToRemove.forEach(key => {
            delete this.customer[key];
          });
          if (this.customer.exist_postal_address) {
            this.existPostalAddress = this.customer.exist_postal_address;
            delete this.customer.exist_postal_address;
            this.customerForm.controls.postal_address = this.fb.group(postalAddress);
            this.customerForm.setValue(this.customer);
          } else {
            delete this.customer.exist_postal_address;
            this.customer.postal_address = {};
            this.customerForm.setValue(this.customer);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.utilService.get('auth/country').subscribe(result => {
      this.countries = result.body;
    });
  }

  initForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      group: [''],
      email: ['', [Validators.email, Validators.required]],
      contact: [''],
      note: [''],
      code: [''],
      gender: [''],
      birthday: [''],
      company: [''],
      website: [''],
      twitter: [''],
      physical_street1: [''],
      physical_street2: [''],
      physical_suburb: [''],
      physical_postcode: [''],
      physical_state: [''],
      physical_country: [''],
      postal_address: this.fb.group({}),
      field1: [''],
      field2: [''],
    });
  }

  submit(): void {
    if (this.customerForm.invalid) {
      return;
    }
    this.customerForm.value.store_name = this.user.store_name;
    this.customerForm.value.user_id = this.user._id;
    this.customerForm.value.exist_postal_address = this.existPostalAddress;
    this.customerForm.value.postal_address = this.customerForm.controls.postal_address.value;
    if (this.mode === 'add') {
      this.utilService.post('customers/customer', this.customerForm.value).subscribe(result => {
        this.toastService.showSuccess('New customer - ' + this.customerForm.value.name + ' added successfully', 'Add customer');
        this.route.navigate(['/dashboard/customers']);
      }, error => {
        this.toastService.showFailed('Failed to add new customer', 'Add customer');
      });
    } else {
      this.customerForm.value._id = this.customerId;
      this.utilService.put('customers/customer', this.customerForm.value).subscribe(result => {
        this.toastService.showSuccess('Customer - ' + this.customerForm.value.name + ' edited successfully', 'Edit customer');
        this.route.navigate(['/dashboard/customers']);
      }, error => {
        this.toastService.showFailed('Failed to edit customer ' + this.customerForm.value.name, 'Edit customer');
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addPostalAddress(): void {
    if (this.existPostalAddress) {
      this.customerForm.controls.postal_address = this.fb.group(postalAddress);
    } else {
      this.customerForm.controls.postal_address = this.fb.group({});
    }
  }

}
