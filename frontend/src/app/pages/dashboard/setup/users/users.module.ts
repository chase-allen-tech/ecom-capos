import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, RolesComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ShareModule,
    FormsModule,
  ]
})
export class UsersModule { }
