import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDayUseComponent } from './other-day-use.component';

describe('OtherDayUseComponent', () => {
  let component: OtherDayUseComponent;
  let fixture: ComponentFixture<OtherDayUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDayUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDayUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
