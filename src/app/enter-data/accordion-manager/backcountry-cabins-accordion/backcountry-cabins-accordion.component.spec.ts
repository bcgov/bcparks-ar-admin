import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCabinsAccordionComponent } from './backcountry-cabins-accordion.component';

describe('BackcountryCabinsAccordionComponent', () => {
  let component: BackcountryCabinsAccordionComponent;
  let fixture: ComponentFixture<BackcountryCabinsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCabinsAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCabinsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
