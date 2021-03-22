import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreditReportsComponent } from './store-credit-reports.component';

describe('StoreCreditReportsComponent', () => {
  let component: StoreCreditReportsComponent;
  let fixture: ComponentFixture<StoreCreditReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCreditReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreditReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
