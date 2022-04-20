import { Component, OnDestroy } from '@angular/core';
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
export class BackcountryCabinsComponent
  extends BaseFormComponent
  implements OnDestroy
{
  public backcountryCabinsForm = new FormGroup({
    adultAttendanceControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    childAttendanceControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    familyAttendanceControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    grossBackcountryCabinRevenueControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public backcountryCabinsFields: any = {
    peopleAdult: this.backcountryCabinsForm.get('adultAttendanceControl'),
    peopleChild: this.backcountryCabinsForm.get('childAttendanceControl'),
    peopleFamily: this.backcountryCabinsForm.get('familyAttendanceControl'),
    revenueFamily: this.backcountryCabinsForm.get(
      'grossBackcountryCabinRevenueControl'
    ),
    notes: this.backcountryCabinsForm.get('varianceNotesControl'),
  };

  private alive = true;
  private subscriptions: any[] = [];

  constructor(
    protected fb: FormBuilder,
    protected formService: FormService,
    private dataService: DataService,
    protected router: Router
  ) {
    super(fb, formService, router);
    (this._form = this.backcountryCabinsForm),
      (this._fields = this.backcountryCabinsFields),
      (this._formName = 'Backcountry Cabins Form');

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Backcountry Cabins';
          }
        })
    );
  }

  async onSubmit() {
    await super.submit();
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
