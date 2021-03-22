import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesHistoryRoutingModule } from './sales-history-routing.module';
import { AllComponent } from './all/all.component';
import { ProcessReturnComponent } from './process-return/process-return.component';
import { ContinueSaleComponent } from './continue-sale/continue-sale.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '@app/_shared/share.module';

@NgModule({
  declarations: [AllComponent, ProcessReturnComponent, ContinueSaleComponent],
  imports: [
    CommonModule,
    FormsModule,
    SalesHistoryRoutingModule,
    ShareModule


  ]
})
export class SalesHistoryModule { }
