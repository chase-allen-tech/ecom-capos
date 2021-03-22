import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfaceRoutingModule } from './interface-routing.module';
import { HomeComponent } from './home/home.component';
import {ShareModule} from '../../_shared/share.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InterfaceRoutingModule,
    ShareModule,
  ]
})
export class InterfaceModule { }
