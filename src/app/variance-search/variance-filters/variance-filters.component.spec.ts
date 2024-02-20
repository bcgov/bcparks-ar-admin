import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceFiltersComponent } from './variance-filters.component';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { MockData } from 'src/app/shared/utils/mock.data';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Constants } from 'src/app/shared/utils/constants';
import { DataService } from 'src/app/services/data.service';
import { UrlService } from 'src/app/services/url.service';
import { SubAreaService } from 'src/app/services/sub-area.service';

describe('VarianceFiltersComponent', () => {
  let component: VarianceFiltersComponent;
  let fixture: ComponentFixture<VarianceFiltersComponent>;

  let mockParkSA = {
    id: '0001',
    name: 'SubArea name'
  };

  let mockParkLegacySA = {
    id: '0002',
    name: 'Legacy SubArea name',
    isLegacy: true
  };

  let mockSubArea = {
    id: '0001',
    sk: '0001',
    subAreaName: 'SubArea name',
    activities: ['Day Use']
  };

  let mockLegacySubArea = {
    id: '0002',
    sk: '0002',
    subAreaName: 'Legacy SubArea name',
    isLegacy: true,
    activities: ['Backcountry Camping']
  };

  let mockPark = {
    parkName: 'Park Name',
    orcs: 'orcs',
    pk: 'pk',
    sk: 'sk',
    subAreas: [mockParkSA, mockParkLegacySA]
  };

  const mockUrlService = {
    getQueryParams: () => {
      return of({
        subAreaId: '0001',
        orcs: '0001',
        date: '202402',
        activity: 'Day Use'
      });
    },
    setQueryParams: () => {
      return;
    }
  };

  const mockDataService = {
    watchItem: (item) => {
      if (item === Constants.dataIds.CURRENT_SUBAREA_LIST) {
        return of(
          [mockSubArea, mockLegacySubArea]
        );
      } else {
        return of(
          [mockPark]
        );
      }
    },
    setItemValue: (item, value) => {
      return;
    }
  };

  const mockSubAreaService = {
    fetchSubareasByOrcs: () => {
      return [mockSubArea, mockLegacySubArea];
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarianceFiltersComponent],
      imports: [RouterTestingModule],
      providers: [
        ChangeDetectorRef,
        HttpClient,
        HttpHandler,
        ConfigService,
        {
          provide: DataService, useValue: mockDataService,
        },
        {
          provide: UrlService, useValue: mockUrlService,
        },
        {
          provide: SubAreaService, useValue: mockSubAreaService,
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VarianceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds typeaheads when the form changes', async () => {
    await fixture.isStable();
    await fixture.detectChanges();
    expect(component._parks.value).toEqual([
      {
        display: mockPark.parkName,
        value: mockPark,
      }
    ]);
    await component.parkChange(mockPark);
    expect(component._subAreas.value).toEqual([
      {
        display: mockSubArea.subAreaName,
        value: mockSubArea
      },
      {
        display: mockLegacySubArea.subAreaName,
        value: mockLegacySubArea
      },
    ]);
    component.subAreaChange(mockSubArea);
    expect(component._activities.value).toEqual([
      'Day Use'
    ]);
  });
});
