import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceAccordionComponent } from './variance-accordion.component';

describe('VarianceAccordionComponent', () => {
  let component: VarianceAccordionComponent;
  let fixture: ComponentFixture<VarianceAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarianceAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarianceAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
