import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootFormComponent } from './root-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/services/activity.service';

describe('RootFormComponent', () => {
  let component: RootFormComponent;
  let fixture: ComponentFixture<RootFormComponent>;

  let mockVarianceData = [
    {
      key: 'varianceField1',
      percentageChange: 1,
      historicalAverage: 1,
      yearlyAverages: {
        "2022": 1,
        "2023": 1
      }
    },
    {
      key: 'varianceField2',
      percentageChange: 1,
      historicalAverage: 1,
      yearlyAverages: {
        "2022": 1,
        "2023": 2
      }
    }
  ]

  let mockUrlParams: {
    orcs: 'orcs',
    subAreaId: 'subAreaId',
    date: 'date',
    parkName: 'parkName',
    subAreaName: 'subAreaName',
    activity: 'activity'
  }

  let mockActivityService = {
    postActivity: (payload, warn) => {
      if (warn) {
        return {
          varianceWarning: true
        }
      }
      return true;
    },
    fetchActivityDetails: () => {
      return null;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootFormComponent],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService,
        BsModalService,
        {
          provide: ActivityService, useValue: mockActivityService
        }
      ]
    });
    fixture = TestBed.createComponent(RootFormComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      field1: new UntypedFormControl(null),
      field2: new UntypedFormControl(null),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets variance popover data', async () => {
    component.varianceData = [...mockVarianceData];
    expect(component.getPopoverData(component.varianceData[0].key)).toEqual(mockVarianceData[0]);
    // change for money
    const moneyVar = {
      key: 'varianceField1',
      percentageChange: 1,
      historicalAverage: '$1.00',
      money: true,
      yearlyAverages: {
        "2022": 1,
        "2023": 1
      }
    }
    expect(component.getPopoverData(component.varianceData[0].key, true)).toEqual(moneyVar);
  })

  it('gets yearly average string', async () => {
    component.varianceData = [...mockVarianceData];
    delete component.varianceData[0].money;
    expect(component.getYearlyAverages(component.varianceData[0])).toEqual([
      {
        year: '2022',
        value: 1
      },
      {
        year: '2023',
        value: 1,
        last: true
      }
    ])
  })

  it('handles submission', async () => {
    // with warning
    const dataSpy = spyOn(component['dataService'], 'setItemValue');
    const navigateSpy = spyOn(component['router'], 'navigate').and.returnValue(null);
    await component.submit(true);
    for (const field in component.form.controls) {
      expect(component.form.controls[field].touched).toBeTrue();
      expect(component.showVarianceModal).toBeTrue();
      expect(dataSpy).not.toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
    }
    await component.submit();
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(dataSpy).toHaveBeenCalledTimes(2);
  })
});
