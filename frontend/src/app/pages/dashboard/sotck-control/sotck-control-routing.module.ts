import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { StockControlComponent } from './stock-control/stock-control.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock-control',
    pathMatch: 'full',
  },
  {
    path: 'stock-control',
    component: StockControlComponent
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent
  },
  {
    path: 'new-order',
    component: NewOrdersComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SotckControlRoutingModule { }
