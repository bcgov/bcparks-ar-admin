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
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent
  extends BaseFormComponent
  implements OnDestroy
{
  public frontcountryCampingForm = new FormGroup({
    campingPartyNightsAttendanceStandardControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    campingPartyNightsAttendanceSeniorControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    campingPartyNightsAttendanceSocialControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    campingPartyNightsAttendanceLongStayControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    campingPartyNightsRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    secondCarsAttendanceStandardControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    secondCarsAttendanceSeniorControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    secondCarsAttendanceSocialControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    secondCarsRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    otherRevenueGrossSaniControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherRevenueElectricalControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherRevenueShowerControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public frontcountryCampingFields: any = {
    campingPartyNightsAttendanceStandard: this.frontcountryCampingForm.get(
      'campingPartyNightsAttendanceStandardControl'
    ),
    campingPartyNightsAttendanceSenior: this.frontcountryCampingForm.get(
      'campingPartyNightsAttendanceSeniorControl'
    ),
    campingPartyNightsAttendanceSocial: this.frontcountryCampingForm.get(
      'campingPartyNightsAttendanceSocialControl'
    ),
    campingPartyNightsAttendanceLongStay: this.frontcountryCampingForm.get(
      'campingPartyNightsAttendanceLongStayControl'
    ),
    campingPartyNightsRevenueGross: this.frontcountryCampingForm.get(
      'campingPartyNightsRevenueGrossControl'
    ),
    secondCarsAttendanceStandard: this.frontcountryCampingForm.get(
      'secondCarsAttendanceStandardControl'
    ),
    secondCarsAttendanceSenior: this.frontcountryCampingForm.get(
      'secondCarsAttendanceSeniorControl'
    ),
    secondCarsAttendanceSocial: this.frontcountryCampingForm.get(
      'secondCarsAttendanceSocialControl'
    ),
    secondCarsRevenueGross: this.frontcountryCampingForm.get(
      'secondCarsRevenueGrossControl'
    ),
    otherRevenueGrossSani: this.frontcountryCampingForm.get(
      'otherRevenueGrossSaniControl'
    ),
    otherRevenueElectrical: this.frontcountryCampingForm.get(
      'otherRevenueElectricalControl'
    ),
    otherRevenueShower: this.frontcountryCampingForm.get(
      'secondCarsRevenueGrossControl'
    ),
    notes: this.frontcountryCampingForm.get('varianceNotesControl'),
  };

  private alive = true;
  private subscriptions: any[] = [];

  constructor(
    protected fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private router: Router
  ) {
    super(fb);
    (this._form = this.frontcountryCampingForm),
      (this._fields = this.frontcountryCampingFields),
      (this._formName = 'Frontcountry Camping Form');

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Frontcountry Camping';
          }
        })
    );
  }

  async onSubmit() {
    await super.submit(this.formService);
    this.router.navigate(['/enter-data'], {
      queryParams: {
        date: this._postObj.date,
        orcs: this._postObj.orcs,
        parkName: this._postObj.parkName,
        subArea: this._postObj.subAreaName,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
