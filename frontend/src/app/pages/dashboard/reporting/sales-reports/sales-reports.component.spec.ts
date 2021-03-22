import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportsComponent } from './sales-reports.component';

describe('SalesReportsComponent', () => {
  let component: SalesReportsComponent;
  let fixture: ComponentFixture<SalesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
