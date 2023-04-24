import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionNotesComponent } from './accordion-notes.component';

describe('AccordionNotesComponent', () => {
  let component: AccordionNotesComponent;
  let fixture: ComponentFixture<AccordionNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.notes).toEqual('');
    expect(component.label).toEqual('Variance notes');
  });
});
