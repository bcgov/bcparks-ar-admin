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
  selector: 'app-backcountry-camping',
  templateUrl: './backcountry-camping.component.html',
  styleUrls: ['./backcountry-camping.component.scss'],
})
export class BackcountryCampingComponent
  extends BaseFormComponent
  implements OnDestroy
{
  public backcountryCampingForm = new FormGroup({
    peopleControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    grossCampingRevenueControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public backcountryCampingFields: any = {
    people: this.backcountryCampingForm.get('peopleControl'),
    grossCampingRevenue: this.backcountryCampingForm.get(
      'grossCampingRevenueControl'
    ),
    notes: this.backcountryCampingForm.get('varianceNotesControl'),
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
    (this._form = this.backcountryCampingForm),
      (this._fields = this.backcountryCampingFields),
      (this._formName = 'Backcountry Camping Form');

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Backcountry Camping';
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
