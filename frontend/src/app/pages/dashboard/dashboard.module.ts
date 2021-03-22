import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import {ShareModule} from '@shared/share.module';
import { ProductsComponent } from './products/products/products.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { SalesLedgerComponent } from './sales-ledger/sales-ledger.component';

@NgModule({
  declarations: [
    HomeComponent, 
    ProductsComponent, 
    SalesLedgerComponent, 
  ],
  imports: [
    CommonModule,
    ShareModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
