import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCabinsSectionComponent } from './backcountry-cabins-section.component';

describe('BackcountryCabinsSectionComponent', () => {
  let component: BackcountryCabinsSectionComponent;
  let fixture: ComponentFixture<BackcountryCabinsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcountryCabinsSectionComponent ]
    })
    .compileComponents();
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
