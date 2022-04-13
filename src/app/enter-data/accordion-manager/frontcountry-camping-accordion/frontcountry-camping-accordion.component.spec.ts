import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcountryCampingAccordionComponent } from './frontcountry-camping-accordion.component';

describe('FrontcountryCampingAccordionComponent', () => {
  let component: FrontcountryCampingAccordionComponent;
  let fixture: ComponentFixture<FrontcountryCampingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontcountryCampingAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCampingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
