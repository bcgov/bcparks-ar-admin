import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCampingAccordionComponent } from './group-camping-accordion.component';

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
});
