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
import {PayAccountDlgComponent} from '@page/dashboard/employees/employee/pay-account-dlg/pay-account-dlg.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  util = Util;
  employeeSearchForm: FormGroup;
  user: any;
  dataSource: any;
  columnsToDisplay = ['name', 'location', 'store_credit', 'account', 'action'];
  columnsToSpecify = ['name', 'action'];
  expandedElement: any | null;
  searchVal = '';
  groups = [];
  employees = [];
  countries = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Employees',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    filename: 'employees'
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
    this.employeeSearchForm = this.fb.group({
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

    const dataGroup = {tbl: 'employeeGroup', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataGroup).subscribe(result => {
      this.groups = result.body;
    });
    this.initEmployee();
  }

  initEmployee(): void {
    const dataEmployee = {tbl: 'employee', user_id: this.user._id, store_name: this.user.store_name};
    this.utilService.get('util/crud', dataEmployee).subscribe(result => {
      this.initEmployeeTable(result);
    });
  }

  initEmployeeTable(result): void {
    // Product
    this.employees = result.body;
    if(this.employees==undefined || this.employees==null)
      this.employees=[];
    this.dataSource = new MatTableDataSource(this.employees);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  import(): void {
    this.route.navigate(['/dashboard/employees/employee-import']);
  }

  handleAction(action, element: any = ''): void {
    if (action === 'add') {
      this.route.navigate(['/dashboard/employees/employee-action'], {queryParams: {mode: 'add'}});
    }
    else if (action === 'edit') {
      this.route.navigate(['/dashboard/employees/employee-action'], {queryParams: {mode: 'edit', id: element._id}});
    } else if (action === 'delete') {
      const data = {action, item: 'employee'};
      const dialogRef = this.dialog.open(RemoveItemDlgComponent, {
        width: '600px',
        data
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.action) {
          this.utilService.delete('util/crud?tbl=employee&_id=' + element._id).subscribe(response => {
            this.toastService.showSuccess('Employee removed successfully', 'Remove Employee');
            this.initEmployee();
          }, error => {
            this.toastService.showFailed('Error occurred while removing employee', 'Remove Employee');
          });
        }
      });
    }
  }

  exportList(): void {
    const employees = this.employees.map(employee => {
      const result = {};
      const data = employee;
      const postalAddress = employee.postal_address;
      delete data.postal_address;
      Object.assign(result, {...data});
      Object.assign(result, {...postalAddress});
      return result;
    });
    const exportToCsv = new ExportToCsv(this.options);
    exportToCsv.generateCsv(employees);
  }

  filterEmployee(): void {
    this.dataSource.filter = this.searchVal.trim().toLowerCase();
  }

  searchEmployee(): void {
    this.employeeSearchForm.value.range = 'all-factor';
    this.employeeSearchForm.value.user_id = this.user.user_id;
    this.employeeSearchForm.value.store_name = this.user.store_name;
    this.utilService.get('employees/employee', this.employeeSearchForm.value).subscribe(result => {
      this.initEmployeeTable(result);
    });
  }


  toggleStatus(event, product): void {
    event.stopPropagation();
    const data = {field: 'enabled', id: product.id, value: !product.enabled};
    this.utilService.put('employees/employee', data).subscribe(result => {
      this.toastService.showSuccess('Employee - ' + product.name + ' switched successfully', 'Switch status');
    });
  }

  clearFilter(): void {
    this.employeeSearchForm.reset();
  }

  viewSale(employee): void {
    this.route.navigate(['/dashboard/sell/sales-history'], {queryParams: {mode: 'viewSale', employeeId: employee._id}});
  }


  payAccount(employee): void {
    const dialogRef = this.dialog.open(PayAccountDlgComponent, {
      width: '600px',
      data: {action: 'pay', amount: employee.account, type: 'cash', register: 'main register'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'pay') {
        const oldAccount = employee.account;
        const oldSpent = employee.total_spent;
        employee.account = oldAccount - result.amount;
        employee.total_spent = oldSpent + result.amount;
        employee.balance = result;
        this.utilService.put('employees/employee', employee).subscribe(response => {
          this.toastService.showSuccess('Account balance was paid successfully', 'Pay Account Balance');
        }, error => {
          this.toastService.showFailed('Error occurred while paying balance', 'Pay Account Balance');
        });
      }
    });
  }
}
