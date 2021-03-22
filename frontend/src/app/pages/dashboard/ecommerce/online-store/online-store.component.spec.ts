import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStoreComponent } from './online-store.component';

describe('OnlineStoreComponent', () => {
  let component: OnlineStoreComponent;
  let fixture: ComponentFixture<OnlineStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
