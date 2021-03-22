import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {UtilService} from '@app/_services/util.service';
import {AuthService} from '@app/_services/auth.service';
import * as UtilFunctions from '@helper/util.helper';
import {RemoveItemDlgComponent} from '@page/dashboard/products/remove-item-dlg/remove-item-dlg.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '@service/toast.service';
@Component({
  selector: 'app-stock-control',
  templateUrl: './stock-control.component.html',
  styleUrls: ['./stock-control.component.scss']
})
export class StockControlComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  lessFilter = true;
  dataSource: any;
  columnsToDisplay = ['number', 'from', 'to', 'status', 'reference', 'items', 'cost', 'created', 'action'];
  searchForm: FormGroup;
  specialCols = ['number', 'from', 'to', 'action'];
  orderTypes = ['purchase', 'return', 'receive'];
  utilFunc = UtilFunctions;
  searchVal: string;
  suppliers = [];
  outlets = ['Main Outlet'];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private utilService: UtilService,
    private toastService: ToastService,
  ) {
    this.searchForm = this.fb.group({
      type: [''],
      outlet: [''],
      supplier: [''],
      date_from: [''],
      date_to: [''],
      due_from: [''],
      due_to: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser;
    const query = {tbl: 'supplier', user_id: user.user_id, store_name: user.store_name};
    this.utilService.get('util/crud', query).subscribe(result => {
      this.suppliers = result.body.map(item => item.name);
    });
    this.initTable();
  }

  handleAction(orderKind: string, action: string): void {
    this.route.navigate(['/dashboard/product/' + orderKind], {queryParams: {action}});
  }

  toggleSearch(): void {
    this.lessFilter = !this.lessFilter;
  }

  searchStock(): void {
    const user = this.authService.getCurrentUser;
    const query: any = {...this.searchForm.value, user_id: user.user_id, store_name: user.store_name, field: 'all-factor'};
    this.utilService.get('product/order', query).subscribe(result => {
      this.injectDataSource(result);
    });
  }


  filterOrder(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  openOrderDlg(element: any, action: string): void {
    if (action === 'Edit') {
      if (element.type === 'purchase') {
        this.route.navigate(['/dashboard/product/order'], {queryParams: {action, id: element.id}});
      } else {
        this.route.navigate(['/dashboard/product/return'], {queryParams: {action, id: element.id}});
      }
    } else if (action === 'Read') {
      this.route.navigate(['/dashboard/product/order-detail'], {queryParams: { id: element.id}});
    }
  }

  removeOrder(element: any): void {
    const data = {item: 'Purchase Order', action: 'remove'};
    const dialogRef = this.dialog.open(RemoveItemDlgComponent, {
      width: '600px',
      height: 'auth',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        this.utilService.delete('product/order?_id=' + element.id).subscribe(response => {
          if (response.status === 204) {
            this.toastService.showSuccess('Purchase order removed successfully', 'Remove Order');
          }
          this.initTable();
        }, error => {
          this.toastService.showFailed('Failed to remove purchase order', 'Remove Order');
        });
      }
    });
  }

  initTable(): void {
    const query = {field: 'all', user_id: this.authService.getCurrentUser.user_id, store_name: this.authService.getCurrentUser.store_name};
    this.utilService.get('product/order', query).subscribe(result => {
      this.injectDataSource(result);
    });
  }

  injectDataSource(result): void {
    const data  = [];
    const stocks = result.body ? result.body : [];
    stocks.forEach(stock => {
      const quantities = stock.products.map(item => item.qty);
      const costs = stock.products.map(item => parseFloat(item.supply_price) * item.qty);
      const totalCost = costs.reduce((a, b) => a + b, 0);
      const totalQty = quantities.reduce((a, b) => a + b, 0);
      data.push({
        id: stock._id, number: stock.order_number , from: stock.supplier , to: stock.deliver_to , status: stock.status,
        created: this.utilFunc.handleDate(stock.created), deliver_date: stock.deliver_date, cost: totalCost, items: totalQty,
        invoice_number: stock.invoice_number, type: stock.type, reference: stock.note,
      });
    });
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
