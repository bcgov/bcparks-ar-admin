import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';

import { SubAreaSearchComponent } from './sub-area-search.component';
import { Utils } from 'src/app/shared/utils/utils';
import { MockData } from 'src/app/shared/utils/mock.data';

describe('SubAreaSearchComponent', () => {
  let component: SubAreaSearchComponent;
  let fixture: ComponentFixture<SubAreaSearchComponent>;
  let router;
  let subAreaService;
  let utils = new Utils();

  const routeValue = {
    snapshot: { queryParams: { id: 123 } }
  };

  let mockSubArea = {
    id: '0001',
    name: 'SubArea name'
  }

  let mockLegacySubArea = {
    id: '0002',
    name: 'Legacy SubArea name',
    isLegacy: true
  }

  let mockPark = {
    parkName: 'Park Name',
    orcs: 'orcs',
    pk: 'pk',
    sk: 'sk',
    subAreas: [mockSubArea, mockLegacySubArea]
  }

  const typeaheadData = [
    mockPark
  ];

  const mockDataService = {
    watchItem: (item) => {
      return of(
        typeaheadData
      )
    }
  }

  const mockContainer = {
    monthSelectedHandler: (event) => {

    },
    _store: {
      dispatch: () => {

      }
    },
    _actions: {
      select: (aDate) => {

      }
    },
    setViewMode: (data) => {

    }
  }

  const mockFormService = {
    setItemValue: () => {
      return of({

      })
    },
    setFormParams: (date, parkName, subAreaId, subAreaName, orcs, isLegacy) => {
      return of();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubAreaSearchComponent],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: DataService, useValue: mockDataService
        },
        ConfigService,
        {
          provide: ActivatedRoute,
          useValue: routeValue
        },
        SubAreaService,
        {
          provide: FormService, useValue: mockFormService
        }
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    subAreaService = TestBed.inject(SubAreaService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAreaSearchComponent);
    component = fixture.componentInstance;
    component.selectedPark = {
      parkName: 'Park Name',
      sk: 'sk',
      subAreas: [{
        id: 'SubArea Id',
        label: 'SubArea Label'
      }]
    };
    component.selectedSubArea = {
      id: 'SubArea Id',
      label: 'SubArea Label'
    };
  });

  it('should create and subscribe to the typeahead data', async () => {
    expect(component).toBeTruthy();
    const typeaheadFormatSpy = spyOn(component, 'formatLegacyTypeaheadLabel');
    await fixture.isStable();
    await fixture.detectChanges();
    expect(typeaheadFormatSpy).toHaveBeenCalledTimes(1);
    expect(component.parks).toEqual([
      {
        display: mockPark.parkName,
        value: mockPark,
        template: null
      }
    ]);
  });

  it('should not navigate to the new route', async () => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();

    await component.dateChange('Park');
    await fixture.detectChanges();

    // NB: We're not testing utils date fn
    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });

  it('should open the calendar', async () => {
    expect(component).toBeTruthy();
    await fixture.isStable();
    const containerSpy = spyOn(mockContainer, 'setViewMode');

    component.onOpenCalendar(mockContainer);
    expect(containerSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to the new route', async () => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigate');
    await fixture.isStable();
    await component.dateChange('202201');
    await fixture.detectChanges();

    // NB: We're not testing utils date fn
    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });

  it('should set park typeahead output', async () => {
    expect(component).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();

    await component.dateChange('202201');
    await fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: {
        snapshot: {
          queryParams: {
            id: 123
          }
        }
      },
      queryParams: {
        date: '202201',
      }
    });

    await component.parkChange({ value: mockPark });
    await fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: {
        snapshot: {
          queryParams: {
            id: 123
          }
        }
      },
      queryParams: {
        date: '202201',
        orcs: 'orcs',
        parkName: 'Park Name',
      }
    });

    await component.subAreaChange({ value: mockLegacySubArea });
    await fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: {
        snapshot: {
          queryParams: {
            id: 123
          }
        }
      },
      queryParams: {
        date: '202201',
        orcs: 'orcs',
        parkName: 'Park Name',
        subAreaId: '0002',
        subAreaName: 'Legacy SubArea name',
      }
    });
  });

  it('should search and set form states properly', async () => {
    expect(component).toBeTruthy();
    const serviceSpy = spyOn(SubAreaService.prototype, "fetchSubArea").and.returnValue(Promise.resolve({}) as any)

    await fixture.isStable();
    await fixture.detectChanges();

    await component.search();

    expect(serviceSpy).toHaveBeenCalled();

    component.parks = utils.convertArrayIntoObjForTypeAhead([MockData.mockPark_1, MockData.mockPark_2, MockData.mockLegacyPark], 'parkName');
    component.formatLegacyTypeaheadLabel(component.parks);

    component.modelDate = null;
    component.fields.park.setValue(null)
    component.fields.subArea.setValue(null)
    component.updateFormState();
    expect(component.parkDisabled).toBe(true);
    expect(component.subAreaDisabled).toBe(true);
    expect(component.continueDisabled).toBe(true);

    component.modelDate = '202201';
    component.updateFormState();
    expect(component.parkDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(true);
    expect(component.continueDisabled).toBe(true);

    component.fields.park.setValue({value: MockData.mockPark_1})
    await component.updateFormState();
    expect(component.parkDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(false);
    expect(component.continueDisabled).toBe(true);

    component.fields.subArea.setValue({value: MockData.mockSubArea_1})
    await component.updateFormState();
    expect(component.parkDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(false);
    expect(component.continueDisabled).toBe(false);

    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    await component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalledTimes(1);
  });
});
