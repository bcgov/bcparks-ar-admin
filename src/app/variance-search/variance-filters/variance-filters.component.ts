import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, first } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { VarianceService } from 'src/app/services/variance.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UrlService } from 'src/app/services/url.service';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-variance-filters',
    templateUrl: './variance-filters.component.html',
    styleUrls: ['./variance-filters.component.scss'],
    standalone: false
})
export class VarianceFiltersComponent implements OnDestroy {

  public _parks = new BehaviorSubject(null);
  public _subAreas = new BehaviorSubject(null);
  public _activities = new BehaviorSubject(null);

  public form = new UntypedFormGroup({
    date: new UntypedFormControl(null, [Validators.required]),
    park: new UntypedFormControl(null, [Validators.required]),
    subArea: new UntypedFormControl(null),
    activity: new UntypedFormControl(null),
    resolved: new UntypedFormControl(null),
  });
  public _isPageLoaded = new BehaviorSubject(false);
  public loading = false;
  public subscriptions = new Subscription();
  public tz = Constants.timezone;
  public maxDate = DateTime.now().setZone(this.tz);
  public lastEvaluatedKey = null;
  public statusOptions: any[] = ['Any', 'Unresolved', 'Resolved'];

  constructor(
    private dataService: DataService,
    private subareaService: SubAreaService,
    private loadingService: LoadingService,
    private urlService: UrlService,
    private varianceService: VarianceService
  ) {
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_PARK).subscribe((res) => {
        if (res) {
          this._parks.next(this.createTypeaheadObj(res, 'parkName'));
        }
      })
    );
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.CURRENT_SUBAREA_LIST).subscribe((res) => {
        if (res) {
          this._subAreas.next(this.createTypeaheadObj(res, 'subAreaName'));
        }
      })
    );
    // Wait for data to load
    this.subscriptions.add(
      this._isPageLoaded.pipe(first((res) => res === true)).subscribe(() => {
        if (this.form.controls['park'].value && this.form.controls['date'].value) {
          this.submit();
        }
      })
    );
    // Watch loading status
    this.subscriptions.add(
      this.loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
      })
    );
    // Watch changes to the park field so we can populate the subarea field
    this.subscriptions.add(
      this.form.controls['park'].valueChanges.subscribe((res) => {
        this.form?.controls?.['subArea']?.reset();
        if (res) {
          this.parkChange(res);
        }
      })
    );
    // Watch changes to the subarea field so we can populate the activities field
    this.subscriptions.add(
      this.form.controls['subArea'].valueChanges.subscribe((res) => {
        this.form?.controls?.['activity']?.reset();
        if (res) {
          this.subAreaChange(res);
        }
      })
    );
    // Update the url to match the form when it changes
    this.subscriptions.add(
      this.form.valueChanges.subscribe((res) => {
        if (this._isPageLoaded.value && res) {
          this.dataService.setItemValue(Constants.dataIds.VARIANCE_LIST, null);
          this.updateUrl();
        }
      })
    );
    // set the date
    this.setDate();
    // set the status
    const keys = this.urlService.getQueryParams();

    if (keys.resolved) {
      this.form.controls['resolved'].setValue(keys.resolved);
    }
    // Wait for parks to load
    this.subscriptions.add(
      this._parks.pipe(first((res) => res?.length > 0)).subscribe(() => {
        // If park provided in url
        if (keys.orcs) {
          // If subarea provided in url
          if (keys.subAreaId) {
            this.subscriptions.add(
              this._subAreas.pipe(first((res) => res?.length)).subscribe(() => {
                if (keys.activity) {
                  // wait for activity load
                  this.subscriptions.add(
                    this._activities.pipe(first((res) => res?.length)).subscribe(() => {
                      setTimeout(() => {
                        this.form.controls['activity'].setValue(keys.activity);
                        this._isPageLoaded.next(true);
                      }, 0);
                    })
                  );
                }
                // set subarea
                setTimeout(() => {
                  this.form.controls['subArea'].setValue(this.getLocalStorageSubAreaById(keys.subAreaId));
                  if (!keys.activity) {
                    this._isPageLoaded.next(true);
                  }
                }, 0);
              })
            );
          }
          // set park
          setTimeout(() => {
            this.form.controls['park'].setValue(this.getLocalStorageParkById(keys.orcs));
            this.form.controls['park'].markAsDirty();
            if (!keys.subAreaId) {
              this._isPageLoaded.next(true);
            }
          }, 0);
        } else {
          this._isPageLoaded.next(true);
        }
      })
    );
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.VARIANCE_LIST).subscribe((res) => {
        if (res && res.lastEvaluatedKey) {
          this.lastEvaluatedKey = res.lastEvaluatedKey;
        } else {
          this.lastEvaluatedKey = null;
        }
      })
    );
  }

  // Check if field true or false
  getValue(field) {
    if (!this.form.controls[field]?.value) {
      return true;
    }
    return false;
  }

  // create typeahead object
  createTypeaheadObj(items, display = null) {
    let list = [];
    for (const item of items) {
      if (display) {
        list.push({
          value: item,
          display: item[display]
        });
      } else {
        list.push(item);
      }
    }
    return list;
  }

  // Build subarea list. Fired when park changes
  async parkChange(parkSelection) {
    const subareas = await this.subareaService.fetchSubareasByOrcs(parkSelection.orcs);
    this._subAreas.next(this.createTypeaheadObj(subareas, 'subAreaName'));
  }

  // Build activity list. Fired when subarea changes
  subAreaChange(subAreaSelection) {
    this._activities.next(this.createTypeaheadObj(subAreaSelection.activities));
  }

  setDate() {
    let params = this.urlService.getQueryParams();
    const format = 'yyyyLL';
    let setDate = DateTime.fromFormat(params?.date || '', format);
    if (setDate > this.maxDate || setDate.invalid) {
      setDate = this.maxDate;
    }
    this.form.controls['date'].setValue(setDate.toFormat(format) || null);
    this.form.controls['date'].markAsDirty();
  }


  // Get park object by orcs
  getLocalStorageParkById(orcs) {
    let park = this._parks?.value?.find((p) => p?.value?.orcs === orcs);
    return park?.value || null;
  }

  // Get subarea object by subarea id
  getLocalStorageSubAreaById(id) {
    let subarea = this._subAreas?.value.find((s) => s?.value?.sk === id);
    return subarea?.value || null;
  }

  // Update the url from the form values
  updateUrl() {
    let value = this.form?.value;
    let params = {};
    if (value?.date) {
      params['date'] = value.date;
    }
    if (value?.park?.parkName) {
      params['parkName'] = value.park.parkName;
    }
    if (value?.park?.orcs) {
      params['orcs'] = value.park.orcs;
    }
    if (value?.subArea?.subAreaName) {
      params['subAreaName'] = value.subArea.subAreaName;
    }
    if (value?.subArea?.sk) {
      params['subAreaId'] = value.subArea.sk;
    }
    if (value?.activity) {
      params['activity'] = value.activity;
    }
    if (value?.resolved !== null) {
      params['resolved'] = String(value.resolved);
    }
    this.urlService.setQueryParams(params);
  }

  submit() {
    // collect form values
    let queryParams = this.collect();
    this.varianceService.fetchVariance(queryParams);
  }

  collect() {
    // collect form values
    let formValues = this.form.value;
    if (!formValues?.resolved || formValues.resolved === 'Any') {
      delete formValues.resolved;
    } else if (formValues.resolved === 'Unresolved') {
      formValues.resolved = false;
    } else if (formValues.resolved === 'Resolved') {
      formValues.resolved = true;
    }
    formValues.lastEvaluatedKey = this.lastEvaluatedKey;
    return {
      ...formValues,
      orcs: formValues.park?.sk,
      subAreaId: formValues.subArea?.sk
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
