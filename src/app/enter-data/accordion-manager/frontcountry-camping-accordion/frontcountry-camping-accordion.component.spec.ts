import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcountryCampingAccordionComponent } from './frontcountry-camping-accordion.component';
import { MockData } from 'src/app/shared/utils/mock.data';

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

  // TODO: build this out to check more than just the length of the summaries array
  it('builds accordion', async () => {
    component.data = MockData.mockFrontcountryCampingRecord_1;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(3);
  });

  it('builds legacy accordion', async () => {
    component.data = MockData.mockFrontcountryCampingRecord_Legacy;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(5);
  });

  it('unsubscribes on destroy', async () => {
    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalled();
  });
});
