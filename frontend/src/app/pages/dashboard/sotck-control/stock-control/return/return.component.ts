import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@service/auth.service';
import {UtilService} from '@service/util.service';
import {ActivatedRoute} from '@angular/router';
import * as UtilFunctions from '@helper/util.helper';
import {ToastService} from '@service/toast.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  stockReturnForm: FormGroup;
  selectedProduct: any;
  products = [];
  productReturned = [];
  user: any;
  query: any;
  suppliers = [];
  outlets = ['Main outlet'];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private utilService: UtilService,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.stockReturnForm = this.fb.group({
      supplier: [],
      deliver_to: [''],
      invoice_number: [''],
      delivery_date: [''],
      order_number: [UtilFunctions.genRandomOrderString(8)],
      note: [''],
    });

    this.router.queryParams.subscribe(returnQuery => {
      if (returnQuery && returnQuery.action) {
        this.query = returnQuery;
        if (returnQuery.action === 'Edit') {
          this.utilService.get('product/order', {field: '_id', _id: returnQuery.id}).subscribe(result => {
            this.initReturn(result.body);
          });
        }
      }
    });
  }

  ngOnInit(): void {
    const dataSupplier = {tbl: 'supplier', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataSupplier).subscribe(result => {
      this.suppliers = result.body;
    });
    const data = {tbl: 'product', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', data).subscribe(result => {
      const products = result.body;
      products.forEach(product => {
        if (product.variant_inv && product.variant_products.length) {
          product.variant_products.forEach(item => {
            const variantProduct = item;
            variantProduct._id = product._id;
            variantProduct.enabled = product.enabled;
            variantProduct.qty = 0;
            this.products.push(variantProduct);
          });
          delete product.variant_products;
        }
        product.qty = 0;
        this.products.push(product);
      });
    });
  }

  initReturn(returned): void {
    this.stockReturnForm.get('supplier').setValue(returned.supplier);
    this.stockReturnForm.get('deliver_to').setValue(returned.deliver_to);
    this.stockReturnForm.get('invoice_number').setValue(returned.invoice_number);
    this.stockReturnForm.get('delivery_date').setValue(returned.delivery_date);
    this.stockReturnForm.get('order_number').setValue(returned.order_number);
    this.stockReturnForm.get('note').setValue(returned.note);
    this.productReturned = returned.products;
  }

  returnProduct(): void {
    if (!this.selectedProduct) {
      return;
    }
    const selProduct: any = {};
    Object.assign(selProduct, this.selectedProduct);
    this.productReturned.push(selProduct);
  }

  removeReturn(i: number): void {
    this.productReturned = this.productReturned.filter((item, key) => key !== i);
  }

  getTotalCost(productReceived: any): number {
    return productReceived.reduce((a, b) => a + b.qty * b.supply_price, 0);
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (this.stockReturnForm.invalid) {
      return;
    }
    this.stockReturnForm.value.user_id = this.user._id;
    this.stockReturnForm.value.store_name = this.user.store_name;
    this.stockReturnForm.value.type = 'return';
    this.stockReturnForm.value.status = 'returned';
    this.stockReturnForm.value.created_by = this.user.first_name + ' ' + this.user.last_name;
    this.stockReturnForm.value.products = this.productReturned;

    if (this.query.action === 'Add') {
      this.utilService.post('product/order', this.stockReturnForm.value).subscribe(result => {
        this.toastService.showSuccess('New return stock created successfully', 'Create Return Stock');
        this.location.back();
      }, error => {
        this.toastService.showFailed('Failed to create order', 'Create Return Stock');
      });
    } else if (this.query.action === 'Edit') {
      const editQuery = {_id: this.query.id, field: 'all', ...this.stockReturnForm.value};
      this.utilService.put('product/order', editQuery).subscribe(result => {
        this.toastService.showSuccess('Return stock edited successfully', 'Edit Return Stock');
        this.location.back();
      }, error => {
        this.toastService.showFailed('Failed to edit return stock', 'Edit Return Stock');
      });
    }
  }
}
