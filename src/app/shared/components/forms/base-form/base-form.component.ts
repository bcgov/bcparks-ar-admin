import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormulaService } from 'src/app/services/formula.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Constants } from 'src/app/shared/utils/constants';

export interface formResult {
  form: UntypedFormGroup;
  isValid?: boolean;
  result: any; // submission result
  fields?: any; // raw key:value pairs
  payload?: any; // object for API submission
  invalidFields?: any;
}

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent implements AfterViewChecked, OnDestroy {
  public form: UntypedFormGroup; // the base form.
  public data: any = {}; // existing form data
  public postObj: any = {}; // post object
  public fields: any = {}; // object linking API fields to form controls & values
  public subscriptions = new Subscription();
  public alive = true;
  public loading = false;
  public dataId: any = '';

  constructor(
    public bFormBuilder: UntypedFormBuilder,
    public bFormService: FormService,
    public bRouter: Router,
    public bDataService: DataService,
    public bActivityService: ActivityService,
    public bFormulaService: FormulaService,
    public bLoadingService: LoadingService,
    public bChangeDetector: ChangeDetectorRef
  ) {
    this.form = this.bFormBuilder.group({});
    this.subscriptions.add(
      this.bDataService
        .watchItem(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .subscribe((res) => {
          if (res) {
            this.postObj['date'] = res.date;
            this.postObj['parkName'] = res.parkName;
            this.postObj['subAreaId'] = res.subAreaId;
            this.postObj['orcs'] = res.orcs;
          }
        })
    );
    this.subscriptions.add(
      this.bLoadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
        // if enable()/disable() arent wrapped in setTimeout(), race conditions can occur
        // https://github.com/angular/angular/issues/22556
        if (this.loading) {
          setTimeout(() => {
            this.disable();
          });
        } else {
          setTimeout(() => {
            this.enable();
          });
        }
      })
    );
  }

  ngAfterViewChecked() {
    this.bChangeDetector.detectChanges();
  }

  // subscribe to changes in the form - pass a callback in if necessary.
  subscribeToChanges(callback?) {
    for (const control of Object.keys(this.form.controls)) {
      this.subscriptions.add(
        this.form.get(control)?.valueChanges.subscribe((changes) => {
          if (callback) {
            callback(changes);
          }
        })
      );
    }
  }

  // gather the simplified key:value form data and format for submission
  collect() {
    let res: any = {};
    for (const field of Object.keys(this.fields)) {
      const value = this.fields[field]?.value;
      res = { ...res, [field]: value };
    }
    return res;
  }

  // delete null fields in preparation for API submission
  trimNullFields(allFields: any) {
    for (const f of Object.keys(allFields)) {
      if (!this.bFormulaService.isValidNumber(allFields[f])) {
        delete allFields[f];
      }
    }
    return allFields;
  }

  // returns form fields that are currently invalid
  getInvalidFields() {
    let res: any = {};
    for (const control of Object.keys(this.form.controls)) {
      let c = this.form.get(control);
      if (c && !c?.valid) {
        res = { ...res, [control]: c };
      }
    }
    return res;
  }

  // merges form data and post object metadata
  makePayload() {
    const trimmedFields = this.trimNullFields(this.collect() || null);
    return { ...this.postObj, ...trimmedFields };
  }

  // disable all fields in the form
  disable() {
    for (const control of Object.keys(this.form.controls)) {
      this.form.get(control)?.disable();
    }
  }

  // enable all fields in the form
  enable() {
    for (const control of Object.keys(this.form.controls)) {
      this.form.get(control)?.enable();
    }
  }

  // return current state of form
  async submit() {
    // We want to override loading to be sure everything is disabled.
    this.loading = true;
    const payload = this.makePayload();
    let res = [];
    // check form validity - do not submit if form is invalid.
    if (this.validate()) {
      res = await this.bActivityService.postActivity(payload);

      // Refresh the accordion with new data.
      await this.bActivityService.fetchActivityDetails(
        'accordion-' + this.postObj.activity,
        this.postObj.orcs,
        this.postObj.subAreaId,
        this.postObj.activity,
        this.postObj.date
      );

      if (res) {
        this.bRouter.navigate(['/enter-data'], {
          queryParams: {
            date: this.postObj.date,
            orcs: this.postObj.orcs,
            parkName: this.postObj.parkName,
            subAreaId: this.postObj.subAreaId,
          },
        });
      } else {
        // TODO: handle error
        this.bRouter.navigate(['/']);
      }
    } else {
      this.loading = false;
      // TODO: handle invalid fields here
    }

    const fResult: formResult = {
      form: this.form,
      fields: this.collect(),
      isValid: this.validate(),
      result: res,
      payload: payload,
      invalidFields: this.getInvalidFields(),
    };

    return fResult;
  }

  // clear the form of all data.
  clear() {
    this.form.reset();
  }

  // check form validity
  validate() {
    if (this.form.valid) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
