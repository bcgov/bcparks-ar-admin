import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcountryCabinsAccordionComponent } from './frontcountry-cabins-accordion.component';

describe('FrontcountryCabinsAccordionComponent', () => {
  let component: FrontcountryCabinsAccordionComponent;
  let fixture: ComponentFixture<FrontcountryCabinsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontcountryCabinsAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCabinsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
