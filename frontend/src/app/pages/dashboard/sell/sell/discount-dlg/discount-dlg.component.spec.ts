import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDlgComponent } from './discount-dlg.component';

describe('DiscountDlgComponent', () => {
  let component: DiscountDlgComponent;
  let fixture: ComponentFixture<DiscountDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
