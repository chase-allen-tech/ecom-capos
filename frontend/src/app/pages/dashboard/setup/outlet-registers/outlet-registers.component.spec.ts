import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletRegistersComponent } from './outlet-registers.component';

describe('OutletRegistersComponent', () => {
  let component: OutletRegistersComponent;
  let fixture: ComponentFixture<OutletRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletRegistersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
