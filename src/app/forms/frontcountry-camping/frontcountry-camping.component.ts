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
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent extends BaseFormComponent {
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
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
          }
        })
    );

    // declare activity type
    (this.postObj['activity'] = 'Frontcountry Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        campingPartyNightsAttendanceStandardControl: new FormControl(
          this.data.campingPartyNightsAttendanceStandard || null,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceSeniorControl: new FormControl(
          this.data.campingPartyNightsAttendanceSenior || null,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceSocialControl: new FormControl(
          this.data.campingPartyNightsAttendanceSocial || null,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceLongStayControl: new FormControl(
          this.data.campingPartyNightsAttendanceLongStay || null,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsRevenueGrossControl: new FormControl(
          this.data.campingPartyNightsRevenueGross || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        secondCarsAttendanceStandardControl: new FormControl(
          this.data.secondCarsAttendanceStandard || null,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsAttendanceSeniorControl: new FormControl(
          this.data.secondCarsAttendanceSenior || null,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsAttendanceSocialControl: new FormControl(
          this.data.secondCarsAttendanceSocial || null,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsRevenueGrossControl: new FormControl(
          this.data.secondCarsRevenueGross || null,
          Validators.pattern('^[0-9]*$')
        ),
        otherRevenueGrossSaniControl: new FormControl(
          this.data.otherRevenueGrossSani || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        otherRevenueElectricalControl: new FormControl(
          this.data.otherRevenueElectrical || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        otherRevenueShowerControl: new FormControl(
          this.data.otherRevenueShower || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes || null),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        campingPartyNightsAttendanceStandard: this.form.get(
          'campingPartyNightsAttendanceStandardControl'
        ),
        campingPartyNightsAttendanceSenior: this.form.get(
          'campingPartyNightsAttendanceSeniorControl'
        ),
        campingPartyNightsAttendanceSocial: this.form.get(
          'campingPartyNightsAttendanceSocialControl'
        ),
        campingPartyNightsAttendanceLongStay: this.form.get(
          'campingPartyNightsAttendanceLongStayControl'
        ),
        campingPartyNightsRevenueGross: this.form.get(
          'campingPartyNightsRevenueGrossControl'
        ),
        secondCarsAttendanceStandard: this.form.get(
          'secondCarsAttendanceStandardControl'
        ),
        secondCarsAttendanceSenior: this.form.get(
          'secondCarsAttendanceSeniorControl'
        ),
        secondCarsAttendanceSocial: this.form.get(
          'secondCarsAttendanceSocialControl'
        ),
        secondCarsRevenueGross: this.form.get('secondCarsRevenueGrossControl'),
        otherRevenueGrossSani: this.form.get('otherRevenueGrossSaniControl'),
        otherRevenueElectrical: this.form.get('otherRevenueElectricalControl'),
        otherRevenueShower: this.form.get('otherRevenueShowerControl'),
        notes: this.form.get('varianceNotesControl')
      });
  }

  async onSubmit() {
    await super.submit();
  }
}
