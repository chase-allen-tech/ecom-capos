import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClickCollectComponent } from './click-collect/click-collect.component';
import { GeneralComponent } from './general/general.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { TaxesComponent } from './taxes/taxes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full'
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: 'taxes',
    component: TaxesComponent
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent
  },
  {
    path: 'click-collect',
    component: ClickCollectComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
