import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Constants} from '../../../_configs/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;
  sidenavState = true;
  dashboardConfig = Constants.dashboardConfig;
  dashboardItems = Constants.dashboardItems;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 2000px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  selectedItem($event) {
    if(localStorage.getItem("Open") == "true" && $event.label == "Open/Close"){
      $event.link = "sell/close";
      this.router.navigate(['dashboard/sell/close']);
    }
  }
}
