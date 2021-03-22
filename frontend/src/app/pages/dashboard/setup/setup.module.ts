import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { GeneralComponent } from './general/general.component';
import { OutletRegistersComponent } from './outlet-registers/outlet-registers.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { SalesTaxesComponent } from './sales-taxes/sales-taxes.component';
import { UsersComponent } from './users/users.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '@app/_shared/share.module';
import { EditPaymentComponent } from './payment-types/edit-payment/edit-payment.component';
import { DeletePaymentComponent } from './payment-types/delete-payment/delete-payment.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { RegisterPlanComponent } from './register-plan/register-plan.component';
import { EditSalesTaxComponent } from './sales-taxes/edit-sales-tax/edit-sales-tax.component';
import { EditOutletComponent } from './outlet-registers/edit-outlet/edit-outlet.component';


@NgModule({
  declarations: [
    GeneralComponent, 
    OutletRegistersComponent, 
    PaymentTypesComponent, 
    EditPaymentComponent,
    DeletePaymentComponent,
    SalesTaxesComponent, 
    EditSalesTaxComponent,
    UsersComponent, 
    MessageBoxComponent, 
    AccountComponent, RegisterPlanComponent, EditOutletComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    UiSwitchModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
