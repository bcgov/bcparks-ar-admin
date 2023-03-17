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

describe('SubAreaSearchComponent', () => {
  let component: SubAreaSearchComponent;
  let fixture: ComponentFixture<SubAreaSearchComponent>;
  let router;
  let subAreaService;

  const routeValue = {
    snapshot: { queryParams: { id: 123 } }
  };

  const typeaheadData = {
    typeAheadData: ['dataElement']
  };

  const mockDataService = {
    getItemValue: (item) => {
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
    setFormParams: (date, parkName, subAreaId, subAreaName, orcs) => {
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
    await fixture.isStable();
    await fixture.detectChanges();

    expect(component.parks).toEqual(typeaheadData);
  });

  it('should not navigate to the new route', async () => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();

    await component.datePickerOutput('Park');
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
    component.modelDate = "2022-01-01";
    await component.datePickerOutput('Park');
    await fixture.detectChanges();

    // NB: We're not testing utils date fn
    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });

  it('should set park typeahead output', async () => {
    expect(component).toBeTruthy();
    component.parks = [
      {
        parkName: 'Park Name',
        pk: 'Park Name',
        sk: 'sk',
        orcs: '1234',
        typeAheadData: ['Park', 'Name'],
        subAreas: [{
          id: 'SubArea Id',
          label: 'SubArea Label'
        }]
      }
    ] as any;

    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();

    await component.parkTypeaheadOutput(0);
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
        date: 'Invalid date',
        orcs: 'sk',
        parkName: 'Park Name'
      }
    });
  });

  it('should navigate to subarea', async () => {
    expect(component).toBeTruthy();
    component.parks = [
      {
        parkName: 'Park Name',
        pk: 'Park Name',
        sk: 'sk',
        orcs: '1234',
        typeAheadData: ['Park', 'Name'],
        subAreas: [{
          id: 'SubArea Id',
          label: 'SubArea Label'
        }]
      }
    ] as any;
    component.subAreas = {
      selectData: [
        {
          id: 'SubArea Id',
          label: 'SubArea Label'
        }
      ]
    }

    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();

    await component.subAreaOutput('SubArea Id');
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
        date: 'Invalid date',
        orcs: 'sk',
        parkName: 'Park Name',
        subAreaId: 'SubArea Id',
        subAreaName: 'SubArea Label'
      }
    });
  });

  it('should search and set button states properly', async () => {
    expect(component).toBeTruthy();
    const serviceSpy = spyOn(SubAreaService.prototype, "fetchSubArea").and.returnValue(Promise.resolve({}) as any)

    await fixture.isStable();
    await fixture.detectChanges();

    await component.search();

    expect(serviceSpy).toHaveBeenCalled();

    await component.setButtonState('none');
    expect(component.typeAheadDisabled).toBe(true);
    expect(component.subAreaDisabled).toBe(true);
    expect(component.continueDisabled).toBe(true);
    expect(component.subAreas.selectData).toEqual([]);

    await component.setButtonState('date');
    expect(component.typeAheadDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(true);
    expect(component.continueDisabled).toBe(true);
    expect(component.subAreas.selectData).toEqual([]);

    await component.setButtonState('park');
    expect(component.typeAheadDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(false);
    expect(component.continueDisabled).toBe(true);
    expect(component.subAreas.selectData).toEqual([]);

    await component.setButtonState('subArea');
    expect(component.typeAheadDisabled).toBe(false);
    expect(component.subAreaDisabled).toBe(false);
    expect(component.continueDisabled).toBe(false);
    expect(component.subAreas.selectData).toEqual([]);

    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    await component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalledTimes(1);
  });
});
