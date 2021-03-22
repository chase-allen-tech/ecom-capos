import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {UtilService} from '@app/_services/util.service';
import {AuthService} from '@app/_services/auth.service';
import * as UtilFunctions from '@helper/util.helper';
import {ToastService} from '@app/_services/toast.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  query: any;
  purchaseOrderForm: FormGroup;
  selectedProduct: any;
  products = [];
  user: any;
  productPurchase = [];
  suppliers = [];
  outlets = ['Main Outlet'];
  private status: string;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {

    this.router.queryParams.subscribe(query => {
      if (query && query.action) {
        this.query = query;
        if (query.action === 'Edit') {
          this.utilService.get('product/order', {field: '_id', _id: query.id}).subscribe(result => {
            this.initOrder(result.body);
          });
        }
      }
    });

    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.purchaseOrderForm = this.fb.group({
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

    const dataProducts = {tbl: 'product', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataProducts).subscribe(result => {
      const products = result.body;
      products.forEach(product => {
        const productId = product._id;
        delete product._id;
        if (product.variant_inv && product.variant_products.length) {
          product.variant_products.forEach(item => {
            const variantId = item._id;
            delete item._id;
            const variantProduct = item;
            variantProduct.product_id = productId;
            variantProduct.variant_id = variantId;
            variantProduct.enabled = product.enabled;
            variantProduct.qty = 0;
            variantProduct.markup = item.markup;
            this.products.push(variantProduct);
          });
          delete product.variant_products;
        }
        product.product_id = productId;
        product.qty = 0;
        this.products.push(product);
      });
    });
  }

  initOrder(order): void {
    this.purchaseOrderForm.get('supplier').setValue(order.supplier);
    this.purchaseOrderForm.get('deliver_to').setValue(order.deliver_to);
    this.purchaseOrderForm.get('invoice_number').setValue(order.invoice_number);
    this.purchaseOrderForm.get('delivery_date').setValue(order.delivery_date);
    this.purchaseOrderForm.get('order_number').setValue(order.order_number);
    this.purchaseOrderForm.get('note').setValue(order.note);
    this.productPurchase = order.products;
  }

  goBack(): void {
    this.location.back();
  }

  purchaseProduct(): void {
    if (!this.selectedProduct) {
      return;
    }
    const selProduct: any = {};
    Object.assign(selProduct, this.selectedProduct);
    this.productPurchase.push(selProduct);
  }

  getTotalCost(products): number {
    return products.reduce((a, b) => a + b.qty * b.supply_price, 0);
  }

  removePurchase(i: number): void {
    this.productPurchase = this.productPurchase.filter((item, key) => key !== i);
  }

  purchaseByReorder(): void {
    const productsPurchase = [];
    this.products.forEach(product => {
      if (product.inventory < product.reorder_point) {
        productsPurchase.push(product);
      }
    });
    if (productsPurchase.length) {
      this.productPurchase.push(...productsPurchase);
    } else {
      window.alert('Reorder points are not set or Not allowed to purchase from reorder points');
    }
  }

  submit(): void {
    if (this.purchaseOrderForm.invalid) {
      return;
    }
    this.purchaseOrderForm.value.user_id = this.user._id;
    this.purchaseOrderForm.value.store_name = this.user.store_name;
    this.purchaseOrderForm.value.type = 'purchase';
    this.purchaseOrderForm.value.created_by = this.user.first_name + ' ' + this.user.last_name;
    this.purchaseOrderForm.value.products = this.productPurchase;
    if (this.query.action === 'Add') {
      this.utilService.post('product/order', this.purchaseOrderForm.value).subscribe(result => {
        this.toastService.showSuccess('New purchase order created successfully', 'Create Purchase Order');
        this.location.back();
      }, error => {
        this.toastService.showFailed('Failed to create order', 'Create Purchase Order');
      });
    } else if (this.query.action === 'Edit') {
      if (this.status) {
        this.purchaseOrderForm.value.status = this.status;
      }
      const editQuery = {_id: this.query.id, field: 'all', ...this.purchaseOrderForm.value};
      this.utilService.put('product/order', editQuery).subscribe(result => {
        this.toastService.showSuccess('Purchase order edited successfully', 'Edit Purchase Order');
        this.location.back();
      }, error => {
        this.toastService.showFailed('Failed to edit order', 'Edit Purchase Order');
      });
    }
  }

  saveAndReceive(): void {
    this.status = 'received';
    this.submit();
  }
}
