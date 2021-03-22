import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OpenComponent } from './open/open.component';
import { ClosedComponent } from './closed/closed.component';
import { AllComponent } from './all/all.component';
import { DetailComponent } from './detail/detail.component';
import { ShareModule } from '@app/_shared/share.module';


@NgModule({
  declarations: [
    OpenComponent,
    ClosedComponent,
    AllComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ShareModule
  ]
})
export class OrdersModule { }
