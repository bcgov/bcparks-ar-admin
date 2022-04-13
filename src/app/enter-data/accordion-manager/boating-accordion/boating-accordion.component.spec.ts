import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatingAccordionComponent } from './boating-accordion.component';

describe('BoatingAccordionComponent', () => {
  let component: BoatingAccordionComponent;
  let fixture: ComponentFixture<BoatingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatingAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
