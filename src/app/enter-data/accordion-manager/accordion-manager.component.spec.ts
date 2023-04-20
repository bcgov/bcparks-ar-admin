import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataService } from 'src/app/services/data.service';
import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';
import { SummarySectionComponent } from 'src/app/shared/components/accordion/summary-section/summary-section.component';

import { AccordionManagerComponent } from './accordion-manager.component';

describe('AccordionManagerComponent', () => {
  let component: AccordionManagerComponent;
  let fixture: ComponentFixture<AccordionManagerComponent>;
  let doc: Document;
  class MockDocument { };
  let subarea = {
    date: new Date(),
    parkName: 'Park Name',
    subAreaId: 'SubArea Id',
    orcs: '1234',
    activities: [
      'Frontcountry Camping',
      'Frontcountry Cabins',
      'Backcountry Camping',
      'Backcountry Cabins',
      'Group Camping',
      'Day Use',
      'Boating'
    ]
  };
  const mockDataService = {
    watchItem: (item) => {
      return of(subarea)
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService, useValue: mockDataService
        },
        {
          provide: Document,
          useClass: MockDocument
        }
      ],
      declarations: [AccordionManagerComponent, SummarySectionComponent, AccordionComponent]
    })
      .compileComponents();
    doc = TestBed.inject(Document);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set subarea data', () => {
    expect(component).toBeTruthy();
    expect(component.subAreaData).toEqual(subarea);
    expect(component.accordions.frontcountryCamping).toEqual(true);
    expect(component.accordions.frontcountryCabins).toEqual(true);
    expect(component.accordions.backcountryCamping).toEqual(true);
    expect(component.accordions.backcountryCabins).toEqual(true);
    expect(component.accordions.groupCamping).toEqual(true);
    expect(component.accordions.dayUse).toEqual(true);
    expect(component.accordions.boating).toEqual(true);
  });

  it('should set the accordion toggle', () => {
    let dummyElement = document.createElement('div');
    dummyElement.setAttribute('id', 'frontcountryCamping');
    dummyElement.classList.add('collapsing');
    let dummyElementChild = document.createElement('div');
    dummyElement.appendChild(dummyElementChild);

    let dummyElement2 = document.createElement('div');
    dummyElement2.setAttribute('id', 'collapsefrontcountryCamping');
    dummyElement2.classList.add('show');

    let dummyElement3 = document.createElement('div');
    dummyElement3.setAttribute('id', 'collapsefrontcountryCamping');
    dummyElement3.classList.add('hide');

    let methodSpy = spyOn(document, 'getElementById').and.callFake(function (elementId: string) {
      if (elementId === 'frontcountryCamping') {
        return dummyElement;
      }
      if (elementId === 'collapsefrontcountryCamping') {
        return dummyElement2 as any;
      }
      if (elementId === 'collapsefrontcountryCamping') {
        return dummyElement3 as any;
      }
    });
    component.accordionToggle('frontcountryCamping');
    expect(methodSpy).toHaveBeenCalled();
  });
});
