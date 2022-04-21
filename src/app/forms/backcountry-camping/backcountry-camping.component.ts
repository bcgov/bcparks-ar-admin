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
  selector: 'app-backcountry-camping',
  templateUrl: './backcountry-camping.component.html',
  styleUrls: ['./backcountry-camping.component.scss'],
})
export class BackcountryCampingComponent extends BaseFormComponent {
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
        .getItemValue(Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
          }
        })
    );

    // declare activity type
    (this.postObj['activity'] = 'Backcountry Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        peopleControl: new FormControl(
          this.data.people || null,
          Validators.pattern('^[0-9]*$')
        ),
        grossCampingRevenueControl: new FormControl(
          this.data.grossCampingRevenue || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes || null),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        people: this.form.get('peopleControl'),
        grossCampingRevenue: this.form.get('grossCampingRevenueControl'),
        notes: this.form.get('varianceNotesControl'),
      });
  }

  async onSubmit() {
    await super.submit();
  }
}
