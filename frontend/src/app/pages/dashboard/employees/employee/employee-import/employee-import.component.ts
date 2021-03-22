import { Component, OnInit } from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {AuthService} from '@service/auth.service';
import {Location} from '@angular/common';
const defaultFields = ['name', 'group', 'email', 'contact', 'physical_street1', 'physical_street2',
                     'physical_suburb', 'physical_postcode', 'physical_state', 'physical_country',
                    'code', 'company', 'gender', 'website', 'twitter', 'note'];

@Component({
  selector: 'app-employee-import',
  templateUrl: './employee-import.component.html',
  styleUrls: ['./employee-import.component.scss']
})
export class EmployeeImportComponent implements OnInit {

  private header: boolean;
  fields = [];
  missingColumns: string[] = [];
  show = true;
  user: any;
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private utilService: UtilService,
    private toastService: ToastService,
    private authService: AuthService,
    private location: Location,
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  import(file): void {
    if (file && file.name.split('.')[1] !== 'csv') {
      this.toastService.showFailed('Only accept csv file format', 'Parse Error');
    }
    else {
      this.header = true;
      this.ngxCsvParser.parse(file, {header: this.header, delimiter: ','})
        .pipe().subscribe((result: Array<any>) => {
        if (result.length) {
          this.fields = Object.keys(result[0]);
        }
        this.missingColumns = defaultFields.filter(field => !this.fields.includes(field));
        if (this.missingColumns.length) {
          return;
        }
        const data = {range: 'csv-import', data: result, store_name: this.user.store_name, user_id: this.user.user_id};
        this.utilService.post('employees/employee', data).subscribe(() => {
          this.toastService.showSuccess('Employees imported successfully', 'Import employees');
        });
      }, (error: NgxCSVParserError) => {
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  closeNotify(): void {
    this.show = false;
  }
}
