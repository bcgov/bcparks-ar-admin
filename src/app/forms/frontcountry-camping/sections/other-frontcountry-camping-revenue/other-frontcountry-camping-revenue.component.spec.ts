import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFrontcountryCampingRevenueComponent } from './other-frontcountry-camping-revenue.component';

describe('OtherFrontcountryCampingRevenueComponent', () => {
  let component: OtherFrontcountryCampingRevenueComponent;
  let fixture: ComponentFixture<OtherFrontcountryCampingRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherFrontcountryCampingRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFrontcountryCampingRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
