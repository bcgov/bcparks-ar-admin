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
  selector: 'app-frontcountry-cabins',
  templateUrl: './frontcountry-cabins.component.html',
  styleUrls: ['./frontcountry-cabins.component.scss'],
})
export class FrontcountryCabinsComponent
  extends BaseFormComponent
  implements OnDestroy
{
  public frontcountryCabinsForm = new FormGroup({
    totalAttendancePartiesControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    revenueGrossCampingControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public frontcountryCabinsFields: any = {
    totalAttendanceParties: this.frontcountryCabinsForm.get(
      'totalAttendancePartiesControl'
    ),
    revenueGrossCamping: this.frontcountryCabinsForm.get(
      'revenueGrossCampingControl'
    ),
    notes: this.frontcountryCabinsForm.get('varianceNotesControl'),
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
    (this._form = this.frontcountryCabinsForm),
      (this._fields = this.frontcountryCabinsFields),
      (this._formName = 'Frontcountry Cabins Form');
    // TODO: populate this with incoming data later

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Frontcountry Cabins';
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
