import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {UtilService} from '@service/util.service';
import {ToastService} from '@service/toast.service';
import {AuthService} from '@service/auth.service';
const defaultFields = [ 'handle', 'sku', 'name', 'description', 'type', 'variant_inventory',  'tag',
  'supply_price', 'retail_price', 'brand', 'supplier', 'supplier_code', 'enabled', 'tracking_inventory', 'tax',
  'inventory', 'reorder_point', 'reorder_amount'];

@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.scss']
})

export class ProductImportComponent implements OnInit {
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
        const data = {mode: 'csv-import', data: result, store_name: this.user.store_name, user_id: this.user.user_id};
        this.utilService.post('product/product', data).subscribe(() => {
          this.toastService.showSuccess('Products imported successfully', 'Import products');
        });
    }, (error: NgxCSVParserError) => {
    });
  }

  goBack(): void {
    this.location.back();
  }

  closeNotify(): void {
    this.show = false;
  }
}
