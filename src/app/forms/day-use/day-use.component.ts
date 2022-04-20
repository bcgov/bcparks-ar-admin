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
  selector: 'app-day-use',
  templateUrl: './day-use.component.html',
  styleUrls: ['./day-use.component.scss'],
})
export class DayUseComponent extends BaseFormComponent implements OnDestroy {
  public dayUseForm = new FormGroup({
    peopleAndVehiclesTrailControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    peopleAndVehiclesVehicleControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    peopleAndVehiclesBusControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    picnicRevenueShelterControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    picnicRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherDayUseRevenueSkiiControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherDayUseRevenueHotSpringsControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public dayUseFields: any = {
    peopleAndVehiclesTrail: this.dayUseForm.get(
      'peopleAndVehiclesTrailControl'
    ),
    peopleAndVehiclesVehicle: this.dayUseForm.get(
      'peopleAndVehiclesVehicleControl'
    ),
    peopleAndVehiclesBus: this.dayUseForm.get('peopleAndVehiclesBusControl'),
    picnicRevenueShelter: this.dayUseForm.get('picnicRevenueShelterControl'),
    picnicRevenueGross: this.dayUseForm.get('picnicRevenueGrossControl'),
    otherDayUseRevenueSkii: this.dayUseForm.get(
      'otherDayUseRevenueSkiiControl'
    ),
    otherDayUseRevenueHotSprings: this.dayUseForm.get(
      'otherDayUseRevenueHotSpringsControl'
    ),
    notes: this.dayUseForm.get('varianceNotesControl'),
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
    (this._form = this.dayUseForm),
      (this._fields = this.dayUseFields),
      (this._formName = 'Day Use Form');

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Day Use';
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
