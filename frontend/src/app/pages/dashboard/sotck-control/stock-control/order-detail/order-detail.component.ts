import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {UtilService} from '@app/_services/util.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/_services/auth.service';
import * as UtilFunction from '@app/_helpers/util.helper';
import {MailDlgComponent} from '@shared/mail-dlg/mail-dlg.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '@service/toast.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  products = [];
  utilFunc =  UtilFunction;
  status = '';

  constructor(
    private location: Location,
    private route: Router,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private utilService: UtilService,
    private toastService: ToastService,
  ) {
    this.router.queryParams.subscribe(result => {
      if (result && result.id) {
        const query = {field: '_id', _id: result.id};
        this.utilService.get('product/order', query).subscribe(response => {
          this.order = response.body;
          this.products = this.order.products;
          this.status = this.order.status;
        });
      }
    });
  }

  ngOnInit(): void {
    this.initDetail();
  }

  initDetail(): void {
  }

  goBack(): void {
    this.location.back();
  }

  edit(): void {
    let type = this.order.type;
    if (this.order.type === 'purchase') {
      type = 'order';
    }
    this.route.navigate(['/dashboard/product/' + type], {queryParams: {id: this.order._id, action: 'Edit'}});
  }

  getRetailPrice(product: any): number {
    const result = parseFloat( product.supply_price) * (1 + parseFloat(product.markup) / 100);
    return result ? result : 0;
  }

  mailOrder(): void {
    const subject = 'Order #' + this.order.order_number + ' from ' + this.authService.getCurrentUser.store_name;
    const dialogRef = this.dialog.open(MailDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {action: 'email_order', subject}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action) {
        this.utilService.put('product/order', {field: 'mail', ...this.order, ...result.content}).subscribe(() => {
          this.status = 'sent';
          this.toastService.showSuccess('Email order sent successfully', 'Email Order');
        },  error => {
          this.toastService.showFailed('Failed to send email order', 'Email Order');
        });
      }
    });
  }
}
