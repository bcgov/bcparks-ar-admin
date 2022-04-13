import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayUseAccordionComponent } from './day-use-accordion.component';

describe('DayUseAccordionComponent', () => {
  let component: DayUseAccordionComponent;
  let fixture: ComponentFixture<DayUseAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayUseAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUseAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
