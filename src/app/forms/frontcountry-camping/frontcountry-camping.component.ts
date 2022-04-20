import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent
  extends BaseFormComponent
  implements OnInit
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

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.frontcountryCampingForm),
      (this._fields = this.frontcountryCampingFields),
      (this._formName = 'Frontcountry Camping Form');
    // TODO: populate this with incoming data later
    this._postObj = {
      date: '202201',
      parkName: 'Mt Assiniboine',
      subAreaName: 'Naiset Cabins',
      type: 'activity',
      orcs: '0005',
      activity: 'Frontcountry Camping',
    };
  }

  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
