import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { Constants } from 'src/app/shared/utils/constants';

export interface formResult {
  form: FormGroup;
  isValid?: boolean;
  error: any; // errors or error codes
  fields?: any; // raw key:value pairs
  payload?: any; // object for API submission
  invalidFields?: any;
}

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent implements OnDestroy {
  public form: FormGroup; // the base form.
  public data: any = {}; // existing form data
  public postObj: any = {}; // post object
  public fields: any = {}; // object linking API fields to form controls & values
  public subscriptions: any[] = [];
  public alive = true;

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    public r: Router,
    public ds: DataService
  ) {
    this.form = this.fb.group({});

    this.subscriptions.push(
      this.ds
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.postObj = res;
          }
        })
    );
  }

  // gather the simplified key:value form data and format for submission
  collect() {
    let res: any = {};
    for (const field of Object.keys(this.fields)) {
      const value = this.fields[field]?.value || null;
      res = { ...res, [field]: value };
    }
    return res;
  }

  // delete null fields in preparation for API submission
  trimNullFields(allFields: any) {
    for (const f of Object.keys(allFields)) {
      if (!allFields[f]) {
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

  // return current state of form
  async submit() {
    const payload = this.makePayload();
    // TODO: PUT goes here.
    const form: formResult = {
      error: null, // return errors if unsuccessful PUT
      form: this.form,
      fields: this.collect(),
      isValid: this.validate(),
      payload: payload,
      invalidFields: this.getInvalidFields(),
    };

    const res = await this.fs.postActivity(form.payload);

    if (res) {
      this.r.navigate(['/enter-data'], {
        queryParams: {
          date: this.postObj.date,
          orcs: this.postObj.orcs,
          parkName: this.postObj.parkName,
          subArea: this.postObj.subAreaName,
        },
      });
    } else {
      // TODO: handle error
      this.r.navigate(['/']);
    }
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
    this.alive = false;
      for (let i = 0; i < this.subscriptions.length; i++) {
        this.subscriptions[i]?.unsubscribe();
    }
  }
}
