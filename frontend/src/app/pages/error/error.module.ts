import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ShareModule } from '@app/_shared/share.module';


@NgModule({
  declarations: [ComingSoonComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    ShareModule,
  ]
})
export class ErrorModule { }
