import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

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
export class BaseFormComponent {
  public _form: FormGroup; // the base form.
  public _postObj: any = {}; // post object metadata
  public _fields: any = {}; // object linking API fields to form controls & values
  public _formName: string = 'Form'; // for debugging purposes only

  constructor(
    public _formBuilder: FormBuilder,
    public _formService: FormService,
    public _router: Router,
    ) {
    this._form = this._formBuilder.group({});
  }

  // gather the simplified key:value form data and format for submission
  collect() {
    let res: any = {};
    for (const field of Object.keys(this._fields)) {
      const value = this._fields[field]?.value || null;
      res = { ...res, [field]: value };
    }
    return res;
  }

  // delete null fields in preparation for API submission
  trimNullFields(fields: any) {
    let res: any = {};
    for (const field of Object.keys(fields)) {
      if (fields[field]) {
        res = { ...res, [field]: fields[field] };
      }
    }
    return res;
  }

  // returns form fields that are currently invalid
  getInvalidFields() {
    let res: any = {};
    for (const control of Object.keys(this._form.controls)) {
      let c = this._form.get(control);
      if (c && !c?.valid) {
        res = { ...res, [control]: c };
      }
    }
    return res;
  }

  // merges form data and post object metadata
  makePayload() {
    const trimmedFields = this.trimNullFields(this.collect() || null);
    return { ...this._postObj, ...trimmedFields };
  }

  // return current state of form
  async submit() {
    const payload = this.makePayload();
    // TODO: PUT goes here.
    const form: formResult = {
      error: null, // return errors if unsuccessful PUT
      form: this._form,
      fields: this.collect(),
      isValid: this.validate(),
      payload: payload,
      invalidFields: this.getInvalidFields(),
    };

    const res = await this._formService.postActivity(form.payload);

    if (res){
      this._router.navigate(['/enter-data'], {
        queryParams: {
          date: this._postObj.date,
          orcs: this._postObj.orcs,
          parkName: this._postObj.parkName,
          subArea: this._postObj.subAreaName,
        },
      });
    } else {
      // TODO: handle error
      this._router.navigate(['/']);
    }
    
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
