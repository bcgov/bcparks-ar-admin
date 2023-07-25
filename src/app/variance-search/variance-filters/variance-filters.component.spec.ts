import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceFiltersComponent } from './variance-filters.component';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { Validators } from '@angular/forms';
import { MockData } from 'src/app/shared/utils/mock.data';

describe('VarianceFiltersComponent', () => {
  let component: VarianceFiltersComponent;
  let fixture: ComponentFixture<VarianceFiltersComponent>;

  let subareas = [
    MockData.mockSubArea_1,
    MockData.mockSubArea_2
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarianceFiltersComponent],
      providers: [
        ChangeDetectorRef,
        HttpClient,
        HttpHandler,
        ConfigService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VarianceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(Object.keys(component.form.controls).length).toEqual(5);
    expect(Object.keys(component.fields).length).toEqual(5);
    for (const field in component.fields) {
      if (field === 'park' || field === 'date') {
        expect(component.form.controls[field].hasValidator(Validators.required)).toEqual(true);
      }
      expect(component.form.controls[field].value).toEqual(null);
      expect(component.form.controls[field].disabled).toEqual(false);
    }
  });

  it('sets the date', async () => {
    // in the past
    component.maxDate = new Date('January 1, 2023');
    let pastYYYYMM = '202206';
    let pastDate = component['utils'].convertYYYYMMToJSDate(pastYYYYMM);
    component.setDate(pastYYYYMM);
    expect(component.previousDateChosen).toEqual(pastDate);
    expect(component.modelDate).toEqual(pastDate);
    // in the future
    jasmine.clock().install();
    let futureYYYYMM = '202307';
    component.setDate(futureYYYYMM);
    jasmine.clock().tick(50)
    expect(component.modelDate).toEqual(pastDate);
    jasmine.clock().uninstall();
  });

  it('builds subarea options', async () => {
    component.buildSubareaOptions(subareas);
    expect(component.subAreas).toEqual([
      {
        key: MockData.mockSubArea_1.sk,
        value: MockData.mockSubArea_1,
        display: MockData.mockSubArea_1.subAreaName,
      },
      {
        key: MockData.mockSubArea_2.sk,
        value: MockData.mockSubArea_2,
        display: MockData.mockSubArea_2.subAreaName,
      },
    ])
  })

  it('builds activity options', async () => {
    component.buildActivityOptions({value: MockData.mockSubArea_1});
    // +1 for 'all' activities
    expect(component.activityOptions.length).toEqual(MockData.mockSubArea_1.activities.length + 1)
  })

  it('clears fields', async () => {
    component.fields.subarea.setValue({value: MockData.mockSubArea_1});
    component.fields.activity.setValue({value: 'mockActivity_1'});
    component.parkCleared();
    expect(component.fields.subarea.value).toEqual(null);
    expect(component.fields.activity.value).toEqual(null);
  })

  it('submits the form', async () => {
    let varianceSpy = spyOn(component['varianceService'], 'fetchVariance');
    component.fields.park.setValue({value: MockData.mockPark_1});
    component.fields.date.setValue('202307');
    component.submit();
    expect(varianceSpy).toHaveBeenCalledOnceWith({
      orcs: 'MOC1',
      park: {value: MockData.mockPark_1},
      date: '202307',
      subarea: null,
      activity: null,
      subAreaId: undefined
    });
  })
});
