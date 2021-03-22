import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { CashManagementComponent } from './cash-management/cash-management.component';
import {ShareModule} from '@shared/share.module';
import { DiscountDlgComponent } from './sell/discount-dlg/discount-dlg.component';
import { CloseComponent } from './close/close.component';
import { SellComponent } from './sell/sell.component';
import { OpenCloseComponent } from './open-close/open-close.component';
import { FormsModule } from '@angular/forms';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { EditCashComponent } from './cash-management/edit-cash/edit-cash.component';
import { DeleteCashComponent } from './cash-management/delete-cash/delete-cash.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    CashManagementComponent, 
    DiscountDlgComponent, 
    SellComponent, 
    OpenCloseComponent, 
    CloseComponent,
    SalesHistoryComponent,
    EditCashComponent,
    DeleteCashComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SellRoutingModule,
    ShareModule,
    NgSelectModule
  ]
})
export class SellModule { }
