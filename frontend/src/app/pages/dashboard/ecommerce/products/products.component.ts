import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@service/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ExportToCsv} from 'export-to-csv';
import {MatDialog} from '@angular/material/dialog';
import { RemoveItemDlgComponent } from './remove-item-dlg/remove-item-dlg.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProductsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productSearchForm: FormGroup;
  user: any;
  products = [];
  dataSource: any;
  columnsToDisplay = ['name', 'brand', 'supplier', 'inventory', 'retail_price', 'enabled', 'created', 'action'];
  columnsToSpecify = ['name', 'enabled', 'action'];
  expandedElement: any | null;
  searchVal = '';
  types = [];
  tags = [];
  suppliers = [];
  brands = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Candidate Long List',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    filename: 'Capos products'
  };
  private property = '';
  private value = '';
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastService,
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    this.router.queryParams.subscribe(data => {
      if (data) {
        const {property, value} = data;
        this.property = property;
        this.value = value;
      }
    });
    this.productSearchForm = this.fb.group({
      type: [''],
      tag: [''],
      supplier: [''],
      brand: [''],
      enabled: ['']
    });
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // Search form
    const dataType = {tbl: 'type', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataType).subscribe(result => {
      this.types = result.body;
    });

    const dataTag = {tbl: 'tag', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataTag).subscribe(result => {
      this.tags = result.body;
    });

    const dataSupplier = {tbl: 'supplier', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataSupplier).subscribe(result => {
      this.suppliers = result.body;
    });

    const dataBrand = {tbl: 'brand', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataBrand).subscribe(result => {
      this.brands = result.body;
    });

    const dataProduct = {tbl: 'product', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataProduct).subscribe(result => {
      this.initProductTable(result);
    });
  }

  initProductTable(result): void {
    // Product
    const products = [];
    this.products = result.body;
    this.products.forEach(product => {
      if (this.property === 'tag' && !product.tag.includes(this.value)) {
        return;
      } else if (this.property === 'brand' && product.brand !== this.value) {
        return;
      } else if (this.property === 'type' && product.type !== this.value) {
        return;
      } else if (this.property === 'supplier' && product.supplier !== this.value) {
        return;
      } else if (this.property === 'tag' && !product.tag.includes(this.value)) {
        return;
      }

      products.push({
        id: product._id , handle: product.handle, name: product.name, sku: product.sku, brand: product.brand, supplier: product.supplier,
        inventory: product.inventory, tracking_inventory: product.tracking_inv, variant_inventory: product.variant_inv, type: product.type,
        supply_price: product.supply_price, supplier_code: product.supplier_code, tax: product.tax, reorder_point: product.reorder_point,
        description: product.description,  variant_products: product.variant_products , retail_price: product.retail_price, tag:
        product.tag, reorder_amount: product.reorder_amount, enabled: product.enabled as boolean, created: product.created_at.split('T')[0],
      });
    });
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  import(): void {
    this.route.navigate(['/dashboard/ecommerce/product-import']);
  }

  handleAction(element: any = '', action): void {
    if (action === 'add') {
      this.route.navigate(['/dashboard/ecommerce/product-add'], {queryParams: {action: 'add'}});
    }
    else if (action === 'read') {
      this.route.navigate(['/dashboard/ecommerce/product-detail'], {queryParams: {_id: element.id}});
    } else if (action === 'edit') {
      this.route.navigate(['/dashboard/ecommerce/product-add'], {queryParams: {_id: element.id, action: 'edit'}});
    } else if (action === 'delete') {
      const dialogRef = this.dialog.open(RemoveItemDlgComponent, {
        width: '600px',
        height: 'auto',
        data: {action: 'delete', item: 'product'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.action) {
          this.utilService.delete('util/crud?tbl=product&_id=' + element.id).subscribe(response => {
            if (response.status === 204) {
              this.dataSource.data = this.dataSource.data.filter(product => product !== element);
              this.toastService.showSuccess('Product - ' + element.name + ' removed successfully', 'Remove Product');
            }
          }, error => {
            this.toastService.showFailed('Failed to remove product', 'Remove Product');
          });
        }
      });
    }
  }

  exportList(): void {
    const productList = this.products.map(product => {
      const tags = product.tag;
      let tagStr = '';
      tags.forEach((tag, index) => {
        tagStr += tags.length - index > 1 ? tag + ';' : tag;
      });
      product.tag = tagStr;
      delete product.id;
      delete product.variant_products;
      return product;
    });
    const exportToCsv = new ExportToCsv(this.options);
    exportToCsv.generateCsv(productList);
  }

  filterProduct(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  searchProduct(): void {
    this.productSearchForm.value.range = 'all-factor';
    this.productSearchForm.value.user_id = this.user.user_id;
    this.productSearchForm.value.store_name = this.user.store_name;
    this.utilService.get('product/product', this.productSearchForm.value).subscribe(result => {
      this.initProductTable(result);
    });
  }


  toggleStatus(event, product): void {
    event.stopPropagation();
    const data = {field: 'enabled', id: product.id, value: !product.enabled};
    this.utilService.put('product/product', data).subscribe(result => {
      this.toastService.showSuccess('Product - ' + product.name + ' switched successfully', 'Switch status');
    });
  }

  clearFilter(): void {
    this.productSearchForm.reset();
  }

}
