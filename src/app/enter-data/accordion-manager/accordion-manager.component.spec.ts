import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';
import { SummarySectionComponent } from 'src/app/shared/components/accordion/summary-section/summary-section.component';

import { AccordionManagerComponent } from './accordion-manager.component';

describe('AccordionManagerComponent', () => {
  let component: AccordionManagerComponent;
  let fixture: ComponentFixture<AccordionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionManagerComponent, SummarySectionComponent, AccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
