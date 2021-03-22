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
import {NewItemDlgComponent} from '../new-item-dlg/new-item-dlg.component';
import {TypeDlgComponent} from './type-dlg/type-dlg.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  columnToDisplay = ['name' , 'number', 'action'];
  dataSource: any;
  user: any;
  types = [];
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
    this.initTypeTable();
  }

  initTypeTable(): void {
    const types = [];
    const data = {fields: 'all', store_name: this.user.store_name, user_id: this.user._id};
    this.utilService.get('product/type', data).subscribe(result => {
      this.types = result.body;
      this.types.forEach(type => {
        types.push({id: type._id, name: type.name, number: type.number});
      });
      this.dataSource = new MatTableDataSource(types);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  addType(): void {
    const dialogRef = this.dialog.open(NewItemDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {item: 'Type', value: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value) {
        const data = {name: result.value, user_id: this.user._id, store_name: this.user.store_name};
        this.utilService.post('product/type', data).subscribe(response => {
          this.initTypeTable();
          this.toastService.showSuccess('New product type - ' + result.value + ' added successfully', 'Add New Product Type');
        }, error => {
          this.toastService.showFailed('Error occurred while adding new product type', 'Add New Product Type');
        });
      }
    });
  }

  toUppercase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  searchType(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  viewProducts(element: any): void {
    this.route.navigate(['/dashboard/product'], {queryParams: {property: 'type', value: element.name}});
  }

  openDlg(element: any, action: string): void {
    const dialogRef = this.dialog.open(TypeDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {value: element.name, action}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.warning = '';
      if (result) {
        if (result.action === 'edit') {
          this.utilService.put('product/type', {_id: element.id, name: result.value}).subscribe(() => {
            this.initTypeTable();
            this.toastService.showSuccess('Type -' + result.value + ' edited successfully', 'Edit Product Type');
          }, error => {
            this.toastService.showFailed('Error occurred while editing product type', 'Edit Product Type');
          });
        } else {
          const url = 'product/type?_id=' + element.id + '&name=' + element.name + '&store_name=' + element.store_name;
          this.utilService.delete(url).subscribe((res) => {
            if (res.status === 200) {
              this.warning = res.body.msg;
            } else if (res.status === 204) {
              this.initTypeTable();
              this.toastService.showSuccess('Product type -' + element.name + ' removed successfully', 'Remove Product Type');
            }
          }, err => {
            this.toastService.showFailed('Error occurred while removing type', 'Remove Product Type');
          });
        }
      }
    });
  }

}
