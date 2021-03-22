import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ShareModule} from '@shared/share.module';
import {SpinnerComponent} from '@shared/spinner/spinner.component';
import { InterLayoutComponent } from '@layout/inter-layout/inter-layout.component';
import { DashboardLayoutComponent } from '@layout/dashboard-layout/dashboard-layout.component';
import { FooterComponent } from '@layout/inter-layout/footer/footer.component';
import { ToolbarComponent } from '@layout/inter-layout/toolbar/toolbar.component';
import { MenubarComponent } from '@layout/inter-layout/menubar/menubar.component';
import {ToastrModule} from 'ngx-toastr';
import { DashboardToolbarComponent } from '@layout/dashboard-layout/dashboard-toolbar/dashboard-toolbar.component';
import {JwtModule} from '@auth0/angular-jwt';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    InterLayoutComponent,
    DashboardLayoutComponent,
    FooterComponent,
    ToolbarComponent,
    MenubarComponent,
    DashboardToolbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3200', 'http://18.217.176.191'],
      },
    }),
    ShareModule,
    PerfectScrollbarModule,
    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
