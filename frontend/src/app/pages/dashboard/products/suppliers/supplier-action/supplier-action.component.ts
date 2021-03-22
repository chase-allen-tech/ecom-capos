import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '@service/auth.service';
import * as UtilFunc from '@helper/util.helper';
export const postalAddress = {
  postal_street1: [''],
  postal_street2: [''],
  postal_suburb: [''],
  postal_postcode: [''],
  postal_state: [''],
  postal_country: [''],
};

@Component({
  selector: 'app-supplier-action',
  templateUrl: './supplier-action.component.html',
  styleUrls: ['./supplier-action.component.scss']
})
export class SupplierActionComponent implements OnInit {
  supplierForm: FormGroup;
  countries = [];
  existPostalAddress: boolean;
  user: any;
  mode: string;
  supplier: any;
  supplierId = '';
  util = UtilFunc;
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
        this.mode = 'edit';
        const data = {fields: '_id', store_name: this.user.store_name, user_id: this.user._id, _id: query.id};
        this.utilService.get('product/supplier', data).subscribe(result => {
          this.supplier = result.body;
          this.supplierId = this.supplier._id;
          delete this.supplier._id;
          delete this.supplier.created_at;
          delete this.supplier.store_name;
          delete this.supplier.user_id;
          delete this.supplier.__v;
          if (this.supplier.exist_postal_address) {
            this.existPostalAddress = this.supplier.exist_postal_address;
            delete this.supplier.exist_postal_address;
            this.supplierForm.controls.postal_address = this.fb.group(postalAddress);
            this.supplierForm.setValue(this.supplier);
          } else {
            delete this.supplier.exist_postal_address;
            this.supplier.postal_address = {};
            this.supplierForm.setValue(this.supplier);
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
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      markup: [''],
      description: [''],
      first_name: ['', Validators.required],
      last_name: [''],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      mobile: [''],
      fax: [''],
      website: [''],
      twitter: [''],
      physical_street1: [''],
      physical_street2: [''],
      physical_suburb: [''],
      physical_postcode: [''],
      physical_state: [''],
      physical_country: [''],
      postal_address: this.fb.group({}),
    });
  }

  submit(): void {
    if (this.supplierForm.invalid) {
      return;
    }
    this.supplierForm.value.exist_postal_address = this.existPostalAddress;
    this.supplierForm.value.postal_address = this.supplierForm.controls.postal_address.value;
    this.supplierForm.value.store_name = this.user.store_name;
    this.supplierForm.value.user_id = this.user._id;
    if (this.mode === 'add') {
      this.utilService.post('product/supplier', this.supplierForm.value).subscribe(result => {
        this.toastService.showSuccess('New supplier - ' + this.supplierForm.value.name + ' added successfully', 'Add supplier');
      }, error => {
        this.toastService.showFailed('Failed to add new supplier', 'Add supplier');
      });
    } else {
      this.supplierForm.value._id = this.supplierId;
      this.utilService.put('product/supplier', this.supplierForm.value).subscribe(result => {
        this.toastService.showSuccess('Supplier - ' + this.supplierForm.value.name + ' edited successfully', 'Edit supplier');
      }, error => {
        this.toastService.showFailed('Failed to edit supplier ' + this.supplierForm.value.name, 'Edit supplier');
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addPostalAddress(): void {
    if (this.existPostalAddress) {
      this.supplierForm.controls.postal_address = this.fb.group(postalAddress);
    } else {
      this.supplierForm.controls.postal_address = this.fb.group({});
    }
  }
}
