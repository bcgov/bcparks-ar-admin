import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { DataService } from 'src/app/services/data.service';
import { FormulaService, formulaResult } from 'src/app/services/formula.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UrlService } from 'src/app/services/url.service';
import { VarianceService } from 'src/app/services/variance.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html'
})
export class RootFormComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription;

  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public revenueTotal: formulaResult = { result: null, formula: '' };

  public showVarianceModal: boolean = false;
  public activityType;
  public accordionType;
  public invalidConfig = {
    showMessage: false
  };
  public fields: any = {};
  public urlParams: any = {};
  public data: any;
  public varianceData: any;
  public loading: boolean;

  public form: any;

  constructor(
    public dataService: DataService,
    public urlService: UrlService,
    public activityService: ActivityService,
    public loadingService: LoadingService,
    public formulaService: FormulaService,
    public varianceService: VarianceService,
    public router: Router,
  ) {
    this.subscriptions.add(
      this.loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
      })
    );
    // Clear variance fields before subscribing.
    this.dataService.setItemValue(Constants.dataIds.VARIANCE_WARNING_TRIGGERED_FIELDS, null);
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.VARIANCE_WARNING_TRIGGERED_FIELDS).subscribe((res) => {
        this.varianceData = res;
      })
    );

  }

  ngOnInit(): void {
    // get values from URL:
    this.loadFromUrl();
    this.afterOnInit();
    this.subscriptions.add(
      this.dataService.watchItem(this.accordionType).subscribe((res) => {
        if (res) {
          this.data = res;
          this.getExistingVariance(this.activityType);
        }
      })
    );
  }

  getExistingVariance(activity) {
    let params = { ...this.urlService.getQueryParams() };
    params['activity'] = activity;
    this.subscriptions.add(
      this.dataService.watchItem(`variance-${activity}`).subscribe((res) => {
        if (!res?.resolved && !res?.notes && res?.fields) {
          this.varianceData = res.fields;
          // touch all fields to trigger invalid state
          for (const field in this.form?.controls) {
            this.form?.controls[field].markAsTouched();
          }
        }
      })
    );
    this.varianceService.fetchVariance(params);
  }

  getPopoverData(controlName, money = false) {
    let variance = this.varianceData?.find((e) => e.key === controlName);
    if (money && variance) {
      variance['money'] = true;
      if (variance?.historicalAverage && typeof variance?.historicalAverage == 'number') {
        let avgValue = variance.historicalAverage.toFixed(2);
        variance.historicalAverage = `$${avgValue}`;
      }
    }
    return variance || null;
  }

  getYearlyAverages(variance) {
    let list = [];
    for (const year of Object.keys(variance?.yearlyAverages)) {
      let value = variance?.money ? `$${variance.yearlyAverages[year].toFixed(2)}` : variance.yearlyAverages[year];
      list.push({ year: year, value: value });
    }
    let last = list[list?.length - 1];
    if (last) {
      list[list?.length - 1]['last'] = true;
    }
    return list;
  }

  async loadFromUrl() {
    this.loadingService.addToFetchList('loadFromUrl');
    this.getUrlParams();
    await this.fetchActivityRecord();
    for (const field in this.form.controls) {
      if (this.data[field]) {
        this.form.controls[field].defaultValue = this.data[field];
      }
    }
    this.form.reset();
    this.loadingService.removeToFetchList('loadFromUrl');
  }

  getUrlParams() {
    this.urlParams = this.urlService.getQueryParams();
  }

  async fetchActivityRecord() {
    await this.activityService.fetchActivityDetails(
      `accordion-${this.activityType}`,
      this.urlParams?.orcs,
      this.urlParams?.subAreaId,
      this.activityType,
      this.urlParams?.date);
  }

  afterOnInit() {
    // override this in extended components to fire after root ngOnInit fires
  }

  hideModal() {
    this.showVarianceModal = false;
  }

  async submit(warn = false) {
    this.loadingService.addToFetchList('submission');
    const payload = this.makePayload();
    const res = await this.activityService.postActivity(payload, warn);
    if (res?.varianceWarning) {
      // touch all fields to trigger invalid state
      for (const field in this.form?.controls) {
        this?.form?.controls[field].markAsTouched();
      }
      this.showVarianceModal = true;
      this.loadingService.removeToFetchList('submission');
      return;
    }
    await this.fetchActivityRecord();
    this.dataService.setItemValue(Constants.dataIds.VARIANCE_WARNING_TRIGGERED_FIELDS, null);
    if (res) {
      this.router.navigate(['/enter-data'], {
        queryParams: {
          date: this.urlParams.date,
          orcs: this.urlParams.orcs,
          parkName: this.urlParams.parkName,
          subAreaId: this.urlParams.subAreaId,
          subAreaName: this.urlParams.subAreaName
        }
      });
      this.dataService.setItemValue(this.accordionType, null);
    } else {
      this.router.navigate(['/']);
    }
    this.hideModal();
    this.loadingService.removeToFetchList('submission');
  }

  makePayload() {
    const payload = {
      orcs: this.urlParams.orcs,
      subAreaId: this.urlParams.subAreaId,
      date: this.urlParams.date,
      parkName: this.urlParams.parkName,
      subAreaName: this.urlParams.subAreaName,
      activity: this.activityType
    };
    const fields = this.trimNullFields(this.form?.value);
    for (const field in fields) {
      if (field !== 'notes') {
        // convert all fields to numbers
        fields[field] = Number(fields[field]);
      }
    }
    return { ...fields, ...payload };
  }

  trimNullFields(fields) {
    // remove null fields
    for (const field in fields) {
      if (!this.formulaService.isValidNumber(fields[field])) {
        delete fields[field];
      }
    }
    return fields;
  }

  varianceFieldInvalidator(controlName): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isInvalid = this.varianceData?.find((e) => e.key === controlName);
      if (isInvalid) {
        return { varianceTrigger: '' };
      }
      return null;
    };
  }

  isSubmitButtonDisabled() {
    if (this.loading) {
      return true;
    }
    if (this.form?.controls?.['notes']?.invalid) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
