import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@service/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {ExportToCsv} from 'export-to-csv';
import {RemoveItemDlgComponent} from '@page/dashboard/products/remove-item-dlg/remove-item-dlg.component';
import {MatDialog} from '@angular/material/dialog';
import * as Util from '@helper/util.helper';
import {PayAccountDlgComponent} from '@page/dashboard/customers/customer/pay-account-dlg/pay-account-dlg.component';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  util = Util;
  customerSearchForm: FormGroup;
  user: any;
  dataSource: any;
  columnsToDisplay = ['name', 'location', 'store_credit', 'account', 'action'];
  columnsToSpecify = ['name', 'action'];
  expandedElement: any | null;
  searchVal = '';
  groups = [];
  customers = [];
  countries = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Customers',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    filename: 'customers'
  };
  private property = '';
  private value = '';
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private route: Router,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private utilService: UtilService,
  ) {
    this.router.queryParams.subscribe(data => {
      if (data && data.property) {
        const {property, value} = data;
        this.property = property;
        this.value = value;
      }
    });
    this.customerSearchForm = this.fb.group({
      group: [''],
      city: [''],
      country: [''],
      created_from: [''],
      created_to: ['']
    });
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // Search form
    this.utilService.get('auth/country', '').subscribe(result => {
      this.countries = result.body;
    });

    const dataGroup = {tbl: 'customerGroup', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataGroup).subscribe(result => {
      this.groups = result.body;
    });
    this.initCustomer();
  }

  initCustomer(): void {
    const dataCustomer = {tbl: 'customer', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataCustomer).subscribe(result => {
      this.initCustomerTable(result);
    });
  }

  initCustomerTable(result): void {
    // Product
    this.customers = result.body;
    if(this.customers==undefined || this.customers==null)
      this.customers=[];
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  import(): void {
    this.route.navigate(['/dashboard/customers/customer-import']);
  }

  handleAction(action, element: any = ''): void {
    if (action === 'add') {
      this.route.navigate(['/dashboard/customers/customer-action'], {queryParams: {mode: 'add'}});
    }
    else if (action === 'edit') {
      this.route.navigate(['/dashboard/customers/customer-action'], {queryParams: {mode: 'edit', id: element._id}});
    } else if (action === 'delete') {
      const data = {action, item: 'customer'};
      const dialogRef = this.dialog.open(RemoveItemDlgComponent, {
        width: '600px',
        data
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.action) {
          this.utilService.delete('util/crud?tbl=customer&_id=' + element._id).subscribe(response => {
            this.toastService.showSuccess('Customer removed successfully', 'Remove Customer');
            this.initCustomer();
          }, error => {
            this.toastService.showFailed('Error occurred while removing customer', 'Remove Customer');
          });
        }
      });
    }
  }

  exportList(): void {
    const customers = this.customers.map(customer => {
      const result = {};
      const data = customer;
      const postalAddress = customer.postal_address;
      delete data.postal_address;
      Object.assign(result, {...data});
      Object.assign(result, {...postalAddress});
      return result;
    });
    const exportToCsv = new ExportToCsv(this.options);
    exportToCsv.generateCsv(customers);
  }

  filterCustomer(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  searchCustomer(): void {
    this.customerSearchForm.value.range = 'all-factor';
    this.customerSearchForm.value.user_id = this.user.user_id;
    this.customerSearchForm.value.store_name = this.user.store_name;
    this.utilService.get('customers/customer', this.customerSearchForm.value).subscribe(result => {
      this.initCustomerTable(result);
    });
  }


  toggleStatus(event, product): void {
    event.stopPropagation();
    const data = {field: 'enabled', id: product.id, value: !product.enabled};
    this.utilService.put('customers/customer', data).subscribe(result => {
      this.toastService.showSuccess('Customer - ' + product.name + ' switched successfully', 'Switch status');
    });
  }

  clearFilter(): void {
    this.customerSearchForm.reset();
  }

  viewSale(customer): void {
    this.route.navigate(['/dashboard/sell/sales-history'], {queryParams: {mode: 'viewSale', customerId: customer._id}});
  }


  payAccount(customer): void {
    const dialogRef = this.dialog.open(PayAccountDlgComponent, {
      width: '600px',
      data: {action: 'pay', amount: customer.account, type: 'cash', register: 'main register'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'pay') {
        const oldAccount = customer.account;
        const oldSpent = customer.total_spent;
        customer.account = oldAccount - result.amount;
        customer.total_spent = oldSpent + result.amount;
        customer.balance = result;
        this.utilService.put('customers/customer', customer).subscribe(response => {
          this.toastService.showSuccess('Account balance was paid successfully', 'Pay Account Balance');
        }, error => {
          this.toastService.showFailed('Error occurred while paying balance', 'Pay Account Balance');
        });
      }
    });
  }
}
