import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SotckControlRoutingModule } from './sotck-control-routing.module';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { StockControlComponent } from './stock-control/stock-control.component';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';
import { EditOrderComponent } from './manage-orders/edit-order/edit-order.component';
import { DeleteOrderComponent } from './manage-orders/delete-order/delete-order.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [
    StockControlComponent,
    ManageOrdersComponent,
    NewOrdersComponent,
    EditOrderComponent, 
    DeleteOrderComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    SotckControlRoutingModule,
    MaterialFileInputModule
  ]
})
export class SotckControlModule { }
