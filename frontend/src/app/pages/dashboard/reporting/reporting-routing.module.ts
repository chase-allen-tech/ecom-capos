import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryReportsComponent } from './inventory-reports/inventory-reports.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';
import { RegisterClosuresComponent } from './register-closures/register-closures.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { StoreCreditReportsComponent } from './store-credit-reports/store-credit-reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales'
  },
  {
    path: 'sales',
    component: SalesReportsComponent
  },
  {
    path: 'inventory',
    component: InventoryReportsComponent
  },
  {
    path: 'payment',
    component: PaymentReportsComponent
  },
  {
    path: 'closures',
    component: RegisterClosuresComponent
  },
  {
    path: 'store-credit',
    component: StoreCreditReportsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
