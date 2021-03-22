import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { InventoryReportsComponent } from './inventory-reports/inventory-reports.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';
import { RegisterClosuresComponent } from './register-closures/register-closures.component';
import { StoreCreditReportsComponent } from './store-credit-reports/store-credit-reports.component';


@NgModule({
  declarations: [
    SalesReportsComponent,
    InventoryReportsComponent,
    PaymentReportsComponent,
    RegisterClosuresComponent,
    StoreCreditReportsComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
