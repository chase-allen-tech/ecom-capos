import {Component, OnInit} from '@angular/core';
import {UtilService} from '@service/util.service';
import {AuthService} from '@service/auth.service';
import {ToastService} from '@service/toast.service';
import {MatDialog} from '@angular/material/dialog';
import {DiscountDlgComponent} from '@page/dashboard/sell/sell/discount-dlg/discount-dlg.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as UtilFunc from '@helper/util.helper';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  selectedProduct: any;
  addedCustomer: any;
  products = [];
  addedProducts = [];
  discountSymbol = '%';
  discountValue = 0;
  showNote = false;
  user: any;
  cartForm: FormGroup;
  payStep = 1;
  amountToPay: number;
  amountTotal: number;
  payments = [];
  util = UtilFunc;
  customers = [];
  private cartId: string;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
    this.cartForm = this.fb.group({
      note: ['']
    });
  }

  ngOnInit(): void {
    this.initProducts();
    this.getCustomers();
    this.initSell();
  }

  getItemCount(): number {
    return this.addedProducts.reduce((a, b) => a + b.qty, 0);
  }

  getTotal(): string {
    const subtotal = this.getSubTotal();
    if (this.discountSymbol === '%') {
      return (subtotal * (1 - this.discountValue / 100)).toFixed(2);
    } else {
      return (subtotal - this.discountValue).toFixed(2);
    }
  }


  getSubTotal(): number {
    const result = this.addedProducts.reduce((a, b) => a + (b.qty * b.retail_price * ( 1  - b.discount_value / 100)), 0);
    return result.toFixed(2);
  }

  initProducts(): void {
    const user = this.authService.getCurrentUser;
    const dataProducts = {tbl: 'product', user_id: user.user_id, store_name: user.store_name};
    this.utilService.get('util/crud', dataProducts).subscribe(result => {
      if (result) {
        const products = result.body;
        products.forEach(product => {
          const productId = product._id;
          delete product._id;
          if (product.variant_inv && product.variant_products.length) {
            product.variant_products.forEach(item => {
              const variantId = item._id;
              delete item._id;
              const variantProduct = item;
              variantProduct.product_name = product.name;
              variantProduct.product_id = productId;
              variantProduct.variant_id = variantId;
              variantProduct.qty = 1;
              variantProduct.discount_value = 0;
              variantProduct.note = '';
              this.products.push(variantProduct);
            });
            delete product.variant_products;
          } else {
            product.product_id = productId;
            product.qty = 1;
            product.discount_value = 0;
            product.note = '';
            this.products.push(product);
          }
        });
      }
    });
  }

  getCustomers(): void {
    this.utilService.get('customers/customer').subscribe(result => {
      this.customers = result.body;
    });
  }

  initSell(): void {
    this.utilService.get('sell/cart', {user_id: this.user.user_id, store_name: this.user.store_name})
      .subscribe(result => {
        if (result) {
          this.addedProducts = result.body.products;
          if (result && result.body.customer.customer_id) {
            const customers = this.customers.filter(customer => customer._id === result.body.customer.customer_id);
            this.addedCustomer = customers[0];
          }
          this.payments = result.body.payments;
          this.discountValue = result.body.discount_value;
          this.discountSymbol = result.body.discount_symbol;
          this.cartForm.get('note').setValue(result.body.note);
          if (result.body.payment_status === 'start') {
            const paid = parseFloat(result.body.payments.reduce((a, b) => a + b.amount, 0));
            this.payStep = 2;
            this.cartId = result.body._id;
            this.amountToPay = result.body.total - paid;
            this.amountTotal = result.body.total - paid;
          }
        }
      });
  }

  addToCart(): void {
    if (!this.selectedProduct) {
      return;
    }
    const selProduct: any = {};
    Object.assign(selProduct, this.selectedProduct);
    this.addedProducts.push(selProduct);
    if (this.addedCustomer) {
      this.cartForm.value.customer = {customer_id: this.addedCustomer._id, name: this.addedCustomer.name};
    }
    this.cartForm.value.products = this.addedProducts;
    const data = {user_id: this.user.user_id, store_name: this.user.store_name, ...this.cartForm.value,
      discount_symbol: this.discountSymbol, discount_value: this.discountValue};
    this.utilService.post('sell/cart', data ).subscribe();
  }

  removeProduct(productNo: number): void {
    this.addedProducts.splice(productNo, 1);
  }

  round2Digits(price: any, index: number, item = ''): string {
    const result = parseFloat(price).toFixed(2);
    if (index >= 0) {
      this.products[index][item] = result ? result : '0';
    } else {
      return result ? result : '0';
    }
  }

  openDlg(action: string): void {
    const dialogRef = this.dialog.open(DiscountDlgComponent, {
      width: '600px',
      data: {value: this.discountValue, symbol: this.discountSymbol, action}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action) {
        this.discountSymbol = result.symbol;
        this.discountValue = result.value;
      }
    });
  }

  toggleNote(): void {
    this.showNote = !this.showNote;
  }

  submit(): void {
    if (!this.addedProducts.length) {
      this.toastService.showFailed('Please add at least one product', 'Add to cart');
      return;
    }
    if (this.addedCustomer) {
      this.cartForm.value.customer = {customer_id: this.addedCustomer._id, name: this.addedCustomer.name};
    }
    this.cartForm.value.products = this.addedProducts;
    this.cartForm.value.payment_status = 'start';
    const data = {user_id: this.user.user_id, store_name: this.user.store_name, total: this.getTotal(),
      subtotal: this.getSubTotal(), total_items: this.getItemCount()
      , ...this.cartForm.value, discount_symbol: this.discountSymbol, discount_value: this.discountValue};
    this.utilService.post('sell/cart', data ).subscribe((result) => {
      if (result) {
        this.cartId = result.body._id;
        this.payStep = 2;
        this.amountToPay = parseFloat(this.getTotal());
        this.amountTotal = parseFloat(this.getTotal());
      }
    });
  }

  getSavings(): string {
    const sum = this.addedProducts.reduce((a, b) => a + b.qty * b.retail_price, 0);
    const result = (parseFloat(sum) - parseFloat(this.getTotal())).toFixed(2);
    return result ? result : '0';
  }

  getChange(): number {
    return this.util.abs(this.amountTotal);
  }

  pay(type: string, customer): void {
    if (this.amountToPay < 0) {
      return;
    }
    if (this.addedCustomer) {
      this.cartForm.value.customer = {customer_id: this.addedCustomer._id, name: this.addedCustomer.name};
    }
    this.cartForm.value.products = this.addedProducts;
    if (this.amountToPay > 0 && this.amountTotal > 0) {
      this.amountTotal = parseFloat(this.round2Digits(this.amountTotal - this.amountToPay, -2));
      const date = new Date();
      this.payments.push({type, amount: this.amountToPay as unknown as number,  created: date.toString()});
      this.cartForm.value.payments = this.payments;
      this.cartForm.value.payment_status = this.amountTotal > 0 ? 'processing' : 'completed';
      const cart = {user_id: this.user.user_id, store_name: this.user.store_name, total: this.getTotal(),
        subtotal: this.getSubTotal(), total_items: this.getItemCount(), change: this.getChange
        , ...this.cartForm.value, discount_symbol: this.discountSymbol, discount_value: this.discountValue};
      this.utilService.post('sell/cart', cart).subscribe((result => {
        if (result) {
          this.utilService.post('sale/sale', {cart_id: this.cartId, ...cart}).subscribe();
        }
      }));
      if (customer) {
        let account = 0;
        let totalSpent = 0;
        let credit = 0;
        let data = {};
        if (customer === 'account') {
          account = parseFloat(this.addedCustomer.account) - this.amountToPay;
          totalSpent = parseFloat(this.addedCustomer.total_spent) + this.amountToPay;
          data = {_id: this.addedCustomer._id, account, total_spent: totalSpent};
        } else {
          credit = parseFloat(this.addedCustomer.store_credit) - this.amountToPay;
          const redeemed = parseFloat(this.addedCustomer.total_redeemed) + this.amountToPay;
          data = {_id: this.addedCustomer._id, store_credit: credit, total_redeemed: redeemed};
        }
        this.utilService.put('customers/customer', data).subscribe((response) => {
        });
      }
      this.amountToPay = parseFloat(this.round2Digits(this.amountTotal, -2));
    }
  }

  goBack(): void {
    this.payStep = 1;
  }

  completeSale(): void {
    if (this.addedCustomer) {
      this.emailToCustomer(this.addedCustomer.email);
    } else {
      this.utilService.delete('sell/cart?user_id=' + this.user.user_id).subscribe();
    }
    this.addedProducts = [];
    this.addedCustomer = null;
    this.payments = [];
    this.payStep = 1;
    this.cartId = null;
    this.discountValue = 0;
    this.selectedProduct = null;
  }

  emailToCustomer(email): void{
    const data = {};
    Object.assign(data, {email, cart_id: this.cartId});
    this.utilService.post('sell/email', data).subscribe(result => {
      this.utilService.delete('sell/cart?user_id=' + this.user.user_id).subscribe();
    });
  }
}
