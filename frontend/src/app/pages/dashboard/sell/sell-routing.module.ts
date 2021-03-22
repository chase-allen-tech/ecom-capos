import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellComponent} from './sell/sell.component';
import {OpenCloseComponent} from './open-close/open-close.component';
import {SalesHistoryComponent} from './sales-history/sales-history.component';
import {CashManagementComponent} from './cash-management/cash-management.component';
import { CloseComponent } from './close/close.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'selling'
  },
  {
    path: 'selling',
    component: SellComponent
  },
  {
    path: 'open',
    component: OpenCloseComponent
  },
  {
    path: 'close',
    component: CloseComponent
  },
  {
    path: 'sales-history',
    component: SalesHistoryComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('../sell/sales-history/sales-history.module').then(m => m.SalesHistoryModule)
      }
    ]
  },
  {
    path: 'cash-management',
    component: CashManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }
