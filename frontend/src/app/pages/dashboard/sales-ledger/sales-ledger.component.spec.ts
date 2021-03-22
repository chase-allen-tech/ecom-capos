import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLedgerComponent } from './sales-ledger.component';

describe('SalesLedgerComponent', () => {
  let component: SalesLedgerComponent;
  let fixture: ComponentFixture<SalesLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
