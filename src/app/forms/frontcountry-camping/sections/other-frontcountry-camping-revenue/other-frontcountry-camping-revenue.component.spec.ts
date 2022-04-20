import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFrontcountryCampingRevenueComponent } from './other-frontcountry-camping-revenue.component';
import { OtherFrontcountryCampingRevenueModule } from './other-frontcountry-camping-revenue.module';

describe('OtherFrontcountryCampingRevenueComponent', () => {
  let component: OtherFrontcountryCampingRevenueComponent;
  let fixture: ComponentFixture<OtherFrontcountryCampingRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherFrontcountryCampingRevenueComponent ],
      imports: [OtherFrontcountryCampingRevenueModule]
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
