import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickCollectComponent } from './click-collect.component';

describe('ClickCollectComponent', () => {
  let component: ClickCollectComponent;
  let fixture: ComponentFixture<ClickCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
