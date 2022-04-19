import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface formResult {
  form: FormGroup;
  isValid?: boolean;
  payload?: any; // for API submission
  invalidFields?: any;
}

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent {
  public _form: FormGroup; // the base form.
  public _formName: string = 'Form'; // for debugging purposes only

  constructor(public _fb: FormBuilder) {
    this._form = this._fb.group({});
  }

  // gather the simplified key:value form data and format for submission
  // null fields are not collected
  collect() {
    let res;
    for (const control of Object.keys(this._form.controls)) {
      const value = this._form.get(control)?.value || null;
      if (value) {
        res = { ...res, [control]: value };
      }
    }
    return res;
  }

  // returns form fields that are currently invalid
  getInvalidFields() {
    let res = {};
    for (const control of Object.keys(this._form.controls)) {
      let c = this._form.get(control);
      if (c && !c?.valid) {
        res = { ...res, [control]: c };
      }
    }
    return res;
  }

  // return current state of form
  submit() {
    let res: formResult = {
      form: this._form,
      isValid: this.validate(),
      payload: this.collect(),
      invalidFields: this.getInvalidFields(),
    };
    return res;
  }

  // clear the form of all data.
  clear() {
    this._form.reset();
  }

  // check form validity
  validate() {
    if (this._form.valid) {
      return true;
    } else {
      return false;
    }
  }
}
