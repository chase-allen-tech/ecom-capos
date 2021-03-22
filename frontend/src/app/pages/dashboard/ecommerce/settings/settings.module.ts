import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { GeneralComponent } from './general/general.component';
import { TaxesComponent } from './taxes/taxes.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { ClickCollectComponent } from './click-collect/click-collect.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [GeneralComponent, TaxesComponent, PaymentMethodsComponent, ClickCollectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    SettingsRoutingModule,
    UiSwitchModule,
    MaterialFileInputModule
  ]
})
export class SettingsModule { }
