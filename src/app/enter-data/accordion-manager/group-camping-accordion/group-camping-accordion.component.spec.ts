import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCampingAccordionComponent } from './group-camping-accordion.component';
import { MockData } from 'src/app/shared/utils/mock.data';

describe('GroupCampingAccordionComponent', () => {
  let component: GroupCampingAccordionComponent;
  let fixture: ComponentFixture<GroupCampingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupCampingAccordionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCampingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // TODO: build this out to check more than just the length of the summaries array
  it('builds accordion', async () => {
    component.data = MockData.mockGroupCampingRecord_1;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(2);
  });

  it('builds legacy accordion', async () => {
    component.data = MockData.mockGroupCampingRecord_Legacy;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(2);
  });

  it('unsubscribes on destroy', async () => {
    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalled();
  });
});
