import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcountryCabinsSectionComponent } from './frontcountry-cabins-section.component';
import { FrontcountryCabinsSectionModule } from './frontcountry-cabins-section.module';

describe('FrontcountryCabinsSectionComponent', () => {
  let component: FrontcountryCabinsSectionComponent;
  let fixture: ComponentFixture<FrontcountryCabinsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontcountryCabinsSectionComponent ],
      imports: [FrontcountryCabinsSectionModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCabinsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
