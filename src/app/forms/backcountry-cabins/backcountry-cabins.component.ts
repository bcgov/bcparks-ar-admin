import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-backcountry-cabins',
  templateUrl: './backcountry-cabins.component.html',
  styleUrls: ['./backcountry-cabins.component.scss'],
})
export class BackcountryCabinsComponent extends BaseFormComponent {
  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router
  ) {
    super(formBuilder, formService, router, dataService);

    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
          }
        })
    );

    // declare activity type
    (this.postObj['activity'] = 'Backcountry Cabins'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        peopleAdultControl: new FormControl(
          this.data.peopleAdult || null,
          Validators.pattern('^[0-9]*$')
        ),
        peopleChildControl: new FormControl(
          this.data.peopleChild || null,
          Validators.pattern('^[0-9]*$')
        ),
        peopleFamilyControl: new FormControl(
          this.data.peopleFamily || null,
          Validators.pattern('^[0-9]*$')
        ),
        revenueFamilyControl: new FormControl(
          this.data.revenueFamily || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes || null),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        peopleAdult: this.form.get('peopleAdultControl'),
        peopleChild: this.form.get('peopleChildControl'),
        peopleFamily: this.form.get('peopleFamilyControl'),
        revenueFamily: this.form.get('revenueFamilyControl'),
        notes: this.form.get('varianceNotesControl'),
      });
  }

  async onSubmit() {
    await super.submit();
  }
}
