import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSummariesComponent } from './accordion-summaries.component';

describe('AccordionSummariesComponent', () => {
  let component: AccordionSummariesComponent;
  let fixture: ComponentFixture<AccordionSummariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionSummariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.summaries).toEqual([]);
  });
});
