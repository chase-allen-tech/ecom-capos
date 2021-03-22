import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxesComponent } from './sales-taxes.component';

describe('SalesTaxesComponent', () => {
  let component: SalesTaxesComponent;
  let fixture: ComponentFixture<SalesTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
