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
import {BrandDlgComponent} from './brand-dlg/brand-dlg.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  columnToDisplay = ['name' , 'description', 'number', 'action'];
  dataSource: any;
  user: any;
  brands = [];
  searchVal: string;
  warning: any = '';
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
    this.initBrandTable();
  }

  initBrandTable(): void {
    const brands = [];
    const data = {fields: 'all', store_name: this.user.store_name, user_id: this.user._id};
    this.utilService.get('product/brand', data).subscribe(result => {
      this.brands = result.body;
      this.brands.forEach(brand => {
        brands.push({id: brand._id, name: brand.name, description: brand.description, number: brand.number});
      });
      this.dataSource = new MatTableDataSource(brands);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  toUppercase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  searchBrand(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  viewProducts(element: any): void {
    this.route.navigate(['/dashboard/product'], {queryParams: {property: 'brand', value: element.name}});
  }

  openDlg(element: any = {name: '', description: ''}, action: string): void {
    const dialogRef = this.dialog.open(BrandDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {value: element.name, description: element.description, action}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.warning = '';
      if (result) {
        if (result.action === 'create') {
          const data = {name: result.value, description: result.description, user_id: this.user._id, store_name: this.user.store_name};
          this.utilService.post('product/brand', data).subscribe(response => {
            this.initBrandTable();
            this.toastService.showSuccess('New brand - ' + result.value + ' added successfully', 'Add new brand');
          }, error => {
            this.toastService.showFailed('Error occurred while adding new tag', 'Add new brand');
          });
        }
        else if (result.action === 'delete') {
          const url = 'product/brand?_id=' + element.id + '&name=' + element.name + '&store_name=' + this.user.store_name;
          this.utilService.delete(url).subscribe((res) => {
            if (res.status === 200) {
              this.warning = res.body.msg;
            } else if (res.status === 204) {
              this.initBrandTable();
              this.toastService.showSuccess('Brand -' + element.name + ' removed successfully', 'Remove Brand');
            }
          }, err => {
            this.toastService.showFailed('Error occurred while removing brand', 'Remove Brand');
          });
        }
        else {
          this.utilService.put('product/brand', {_id: element.id, name: result.value, description: result.description}).subscribe(() => {
            this.initBrandTable();
            this.toastService.showSuccess('Brand -' + result.value + ' edited successfully', 'Edit Brand');
          }, error => {
            this.toastService.showFailed('Error occurred while editing brand', 'Edit Brand');
          });
        }
      }
    });
  }

}
