import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueSaleComponent } from './continue-sale.component';

describe('ContinueSaleComponent', () => {
  let component: ContinueSaleComponent;
  let fixture: ComponentFixture<ContinueSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
