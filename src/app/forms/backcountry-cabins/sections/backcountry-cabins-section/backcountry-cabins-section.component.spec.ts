import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCabinsSectionComponent } from './backcountry-cabins-section.component';
import { BackcountryCabinsSectionModule } from './backcountry-cabins-section.module';

describe('BackcountryCabinsSectionComponent', () => {
  let component: BackcountryCabinsSectionComponent;
  let fixture: ComponentFixture<BackcountryCabinsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCabinsSectionComponent],
      imports: [BackcountryCabinsSectionModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCabinsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
