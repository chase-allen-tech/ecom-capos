import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {UtilService} from '@service/util.service';
import {AuthService} from '@service/auth.service';
import {ToastService} from '@service/toast.service';
import * as UtilFunctions from '@helper/util.helper';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit {

  receiveStockForm: FormGroup;
  selectedProduct: any;
  products = [];
  user: any;
  productReceived = [];
  suppliers = [];
  outlets = ['Main Outlet'];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastService,
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.receiveStockForm = this.fb.group({
      supplier: [''],
      deliver_to: ['Main outlet'],
      invoice_number: [''],
      delivery_date: [''],
      order_number: [UtilFunctions.genRandomOrderString(8)],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
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

  goBack(): void {
    this.location.back();
  }

  receiveProduct(): void {
    if (!this.selectedProduct) {
      return;
    }
    const selProduct: any = {};
    Object.assign(selProduct, this.selectedProduct);
    this.productReceived.push(selProduct);
  }

  getTotalCost(products): number {
    return products.reduce((a, b) => a + b.qty * b.supply_price, 0);
  }

  removeReceive(i: number): void {
    this.productReceived = this.productReceived.filter((item, key) => key !== i);
  }

  submit(): void {
    if (this.receiveStockForm.invalid) {
      return;
    }
    this.receiveStockForm.value.user_id = this.user._id;
    this.receiveStockForm.value.store_name = this.user.store_name;
    this.receiveStockForm.value.created_by = this.user.first_name + ' ' + this.user.last_name;
    this.receiveStockForm.value.type = 'receive';
    this.receiveStockForm.value.status = 'received';
    this.receiveStockForm.value.products = this.productReceived;
    this.utilService.post('product/order', this.receiveStockForm.value).subscribe(result => {
      this.toastService.showSuccess('New received order created successfully', 'Create Received Order');
      this.location.back();
    }, error => {
      this.toastService.showFailed('Failed to create received order', 'Create Received Order');
    });
  }
}
