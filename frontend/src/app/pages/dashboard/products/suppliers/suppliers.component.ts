import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Location} from '@angular/common';
import {UtilService} from '../../../../_services/util.service';
import {AuthService} from '../../../../_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../../../_services/toast.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {SupplierDlgComponent} from './supplier-dlg/supplier-dlg.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  columnToDisplay = ['name' , 'description', 'markup', 'number', 'action'];
  dataSource: any;
  user: any;
  suppliers = [];
  searchVal: string;
  warning: any;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  constructor(
    private location: Location,
    private utilService: UtilService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private route: Router,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.initSupplierTable();
  }

  initSupplierTable(): void {
    const suppliers = [];
    const data = {fields: 'all', store_name: this.user.store_name, user_id: this.user._id};
    this.utilService.get('product/supplier', data).subscribe(result => {
      this.suppliers = result.body;
      this.suppliers.forEach(supplier => {
        suppliers.push({id: supplier._id, name: supplier.name, description: supplier.description,
         markup: supplier.markup , number: supplier.number});
      });
      this.dataSource = new MatTableDataSource(suppliers);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  handleAction(action, element: any = {}): void {
    if (action === 'add') {
      this.route.navigate(['/dashboard/product/supplier-action'], {queryParams: {mode: 'add'}});
    } else {
      this.route.navigate(['/dashboard/product/supplier-action'], {queryParams: {mode: 'edit', id: element.id}});
    }
  }

  toUppercase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  searchSupplier(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  viewProducts(element: any): void {
    this.route.navigate(['/dashboard/product'], {queryParams: {property: 'supplier', value: element.name}});
  }

  openDlg(element: any, action: string): void {
    const dialogRef = this.dialog.open(SupplierDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {action}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.warning = '';
      if (result) {
        const url = 'product/supplier?_id=' + element.id + '&name=' + element.name + '&store_name=' + this.user.store_name;
        this.utilService.delete(url).subscribe((res) => {
          if (res.status === 200) {
            this.warning = res.body.msg;
          } else if (res.status === 204) {
            this.initSupplierTable();
            this.toastService.showSuccess('Supplier -' + element.name + ' removed successfully', 'Remove Product Supplier');
          }
        }, err => {
          this.toastService.showFailed('Error occurred while removing supplier', 'Remove Product Supplier');
        });
      }
    });
  }

}
