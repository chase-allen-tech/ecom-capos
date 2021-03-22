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
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrls: ['./employee-action.component.scss']
})
export class EmployeeActionComponent implements OnInit {
  util = UtilFunc;
  employeeForm: FormGroup;
  countries = [];
  existPostalAddress: boolean;
  user: any;
  mode: string;
  employee: any;
  employeeId = '';
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
        this.utilService.get('employees/employee', data).subscribe(result => {
          this.employee = result.body;
          this.employeeId = this.employee._id;
          keysToRemove.forEach(key => {
            delete this.employee[key];
          });
          if (this.employee.exist_postal_address) {
            this.existPostalAddress = this.employee.exist_postal_address;
            delete this.employee.exist_postal_address;
            this.employeeForm.controls.postal_address = this.fb.group(postalAddress);
            this.employeeForm.setValue(this.employee);
          } else {
            delete this.employee.exist_postal_address;
            this.employee.postal_address = {};
            this.employeeForm.setValue(this.employee);
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
    this.employeeForm = this.fb.group({
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
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeForm.value.store_name = this.user.store_name;
    this.employeeForm.value.user_id = this.user._id;
    this.employeeForm.value.exist_postal_address = this.existPostalAddress;
    this.employeeForm.value.postal_address = this.employeeForm.controls.postal_address.value;
    if (this.mode === 'add') {
      this.utilService.post('employees/employee', this.employeeForm.value).subscribe(result => {
        this.toastService.showSuccess('New employee - ' + this.employeeForm.value.name + ' added successfully', 'Add employee');
        this.route.navigate(['/dashboard/employees']);
      }, error => {
        this.toastService.showFailed('Failed to add new employee', 'Add employee');
      });
    } else {
      this.employeeForm.value._id = this.employeeId;
      this.utilService.put('employees/employee', this.employeeForm.value).subscribe(result => {
        this.toastService.showSuccess('Employee - ' + this.employeeForm.value.name + ' edited successfully', 'Edit employee');
        this.route.navigate(['/dashboard/employees']);
      }, error => {
        this.toastService.showFailed('Failed to edit employee ' + this.employeeForm.value.name, 'Edit employee');
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addPostalAddress(): void {
    if (this.existPostalAddress) {
      this.employeeForm.controls.postal_address = this.fb.group(postalAddress);
    } else {
      this.employeeForm.controls.postal_address = this.fb.group({});
    }
  }

}
