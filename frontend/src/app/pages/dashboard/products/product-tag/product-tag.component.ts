import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {UtilService} from '../../../../_services/util.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../_services/auth.service';
import {NewItemDlgComponent} from '../new-item-dlg/new-item-dlg.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../../../_services/toast.service';
import {Router} from '@angular/router';
import {TagDlgComponent} from './tag-dlg/tag-dlg.component';


@Component({
  selector: 'app-product-tag',
  templateUrl: './product-tag.component.html',
  styleUrls: ['./product-tag.component.scss']
})
export class ProductTagComponent implements OnInit {
  columnToDisplay = ['name' , 'number', 'action'];
  dataSource: any;
  user: any;
  tags = [];
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
    this.initTagTable();
  }

  initTagTable(): void {
    const tags = [];
    const data = {fields: 'all', store_name: this.user.store_name, user_id: this.user._id};
    this.utilService.get('product/tag', data).subscribe(result => {
      this.tags = result.body;
      this.tags.forEach(tag => {
        tags.push({id: tag._id, name: tag.name, number: tag.number});
      });
      this.dataSource = new MatTableDataSource(tags);
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  addTag(): void {
    const dialogRef = this.dialog.open(NewItemDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {item: 'Tag', value: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value) {
        const data = {name: result.value, user_id: this.user._id, store_name: this.user.store_name};
        this.utilService.post('product/tag', data).subscribe(response => {
          this.initTagTable();
          this.toastService.showSuccess('New tag - ' + result.value + ' added successfully', 'Add new tag');
        }, error => {
          this.toastService.showFailed('Error occurred while adding new tag', 'Add new tag');
        });
      }
    });
  }

  toUppercase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  searchTag(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  viewProducts(element: any): void {
    this.route.navigate(['/dashboard/product'], {queryParams: {property: 'tag', value: element.name}});
  }

  openDlg(element: any, action: string): void {
    const dialogRef = this.dialog.open(TagDlgComponent, {
      width: '600px',
      height: 'auto',
      data: {value: element.name, action}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.warning = '';
      if (result) {
        if (result.action === 'edit') {
          this.utilService.put('product/tag', {_id: element.id, name: result.value}).subscribe(() => {
            this.initTagTable();
            this.toastService.showSuccess('Tag -' + result.value + ' edited successfully', 'Edit tag');
          }, error => {
            this.toastService.showFailed('Error occurred while editing tag', 'Edit tag');
          });
        } else {
          const url = 'product/tag?_id=' + element.id + '&name=' + element.name + '&store_name=' + element.store_name;
          this.utilService.delete(url).subscribe((res) => {
            if (res.status === 200) {
              this.warning = res.body.msg;
            } else if (res.status === 204) {
              this.initTagTable();
              this.toastService.showSuccess('Tag -' + element.name + ' removed successfully', 'Remove tag');
            }
          }, err => {
            this.toastService.showFailed('Error occurred while removing tag', 'Remove tag');
          });
        }
      }
    });
  }
}
