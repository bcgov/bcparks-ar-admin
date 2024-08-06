import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { DateTime } from 'luxon';

import { SubAreaSearchComponent } from './sub-area-search.component';
import { UrlService } from 'src/app/services/url.service';
import { Constants } from 'src/app/shared/utils/constants';

describe('SubAreaSearchComponent', () => {
  let component: SubAreaSearchComponent;
  let fixture: ComponentFixture<SubAreaSearchComponent>;
  let router;
  let subAreaService;

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
    },
    setItemValue: (item, value) => {
      return;
    }
  }

  const mockUrlService = {
    getQueryParams: () => {
      return of({
        subAreaId: '0001',
        orcs: '0001',
        date: '202402'
      });
    },
    setQueryParams: () => {
      return;
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
        },
        UrlService,
        {
          provide: UrlService, useValue: mockUrlService
        }
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    subAreaService = TestBed.inject(SubAreaService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAreaSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create and subscribe to the typeahead data', async () => {
    expect(component).toBeTruthy();
    await fixture.isStable();
    await fixture.detectChanges();
    expect(component._parks.value).toEqual([
      {
        display: mockPark.parkName,
        value: mockPark,
      }
    ]);
    component.parkChange(mockPark);
    expect(component._subAreas.value).toEqual([
      {
        display: mockSubArea.name,
        value: mockSubArea
      },
      {
        display: mockLegacySubArea.name,
        value: mockLegacySubArea
      }
    ]);
  });

  it('should not navigate to the new route', async () => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigate');

    await fixture.isStable();
    await fixture.detectChanges();

    // NB: We're not testing utils date fn
    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });

  it('should set the date from the url', async () => {
    component.maxDate = DateTime.fromFormat('2024-02-14', 'yyyy-LL-dd').toUTC();
    await fixture.isStable();
    expect(component.isPageLoaded).toBe(true);
  });

  it('should clear the accordions when the form value changes', async () => {
    const dataSpy = spyOn(mockDataService, 'setItemValue');
    component.isPageLoaded = true;
    component.form.reset();
    expect(dataSpy).toHaveBeenCalledWith(
      Constants.dataIds.ENTER_DATA_SUB_AREA,
      null
    )
    expect(dataSpy).toHaveBeenCalledWith(
      Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST,
      null
    )
  })

  it('should set subarea typeahead output', async () => {
    await fixture.isStable();
    await fixture.detectChanges();
    const typeaheadSpy = spyOn(component, 'createTypeaheadObj');
    component.parkChange(mockPark)
    expect(typeaheadSpy).toHaveBeenCalledTimes(1);
  });

  it('should update subareas when park changes', async () => {
    component.form.reset();
    expect(component.form.controls['park'].value).toBe(null);
    expect(component.form.controls['subArea'].value).toBe(null);
    component.form.controls['park'].setValue(mockPark);
    expect(component._subAreas.value).toEqual([
      {
        display: mockSubArea.name,
        value: mockSubArea
      },
      {
        display: mockLegacySubArea.name,
        value: mockLegacySubArea
      },
    ])
  })

  it('should update the url when the form changes', async () => {
    const urlUpdateSpy = spyOn(component, 'updateUrl');
    component.form.controls['date'].setValue('202402');
    expect(urlUpdateSpy).toHaveBeenCalledTimes(1);
  })

  it('gets local storage park by park orcs', async () => {
    expect(component.getLocalStorageParkById(mockPark.orcs)).toEqual(mockPark);
  })

  it('gets local storage subarea by subarea id', async () => {
    component._subAreas.next(component.createTypeaheadObj([
      mockSubArea,
      mockLegacySubArea
    ], 'name'));
    expect(component.getLocalStorageSubAreaById(mockSubArea.id)).toEqual(mockSubArea);
  })
});
