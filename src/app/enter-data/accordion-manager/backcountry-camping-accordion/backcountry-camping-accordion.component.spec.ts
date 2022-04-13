import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCampingAccordionComponent } from './backcountry-camping-accordion.component';

describe('BackcountryCampingAccordionComponent', () => {
  let component: BackcountryCampingAccordionComponent;
  let fixture: ComponentFixture<BackcountryCampingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCampingAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCampingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
