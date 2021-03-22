import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlanComponent } from './register-plan.component';

describe('RegisterPlanComponent', () => {
  let component: RegisterPlanComponent;
  let fixture: ComponentFixture<RegisterPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
