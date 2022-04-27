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
import { SubAreaService } from 'src/app/services/sub-area.service';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent extends BaseFormComponent {
  public loading = false;
  public partyAttendanceTotal: formulaResult = { result: null, formula: '' };
  public vehicleAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyRevenueTotal: formulaResult = { result: null, formula: '' };
  public vehicleRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      subAreaService,
      formulaService,
      loadingService
    );
    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
            this.setForm();
          }
        })
    );
    this.setForm();
  }

  setForm() {
    // declare activity type
    (this.postObj['activity'] = 'Frontcountry Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        campingPartyNightsAttendanceStandardControl: new FormControl(
          this.data.campingPartyNightsAttendanceStandard,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceSeniorControl: new FormControl(
          this.data.campingPartyNightsAttendanceSenior,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceSocialControl: new FormControl(
          this.data.campingPartyNightsAttendanceSocial,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsAttendanceLongStayControl: new FormControl(
          this.data.campingPartyNightsAttendanceLongStay,
          Validators.pattern('^[0-9]*$')
        ),
        campingPartyNightsRevenueGrossControl: new FormControl(
          this.data.campingPartyNightsRevenueGross,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        secondCarsAttendanceStandardControl: new FormControl(
          this.data.secondCarsAttendanceStandard,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsAttendanceSeniorControl: new FormControl(
          this.data.secondCarsAttendanceSenior,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsAttendanceSocialControl: new FormControl(
          this.data.secondCarsAttendanceSocial,
          Validators.pattern('^[0-9]*$')
        ),
        secondCarsRevenueGrossControl: new FormControl(
          this.data.secondCarsRevenueGross,
          Validators.pattern('^[0-9]*$')
        ),
        otherRevenueGrossSaniControl: new FormControl(
          this.data.otherRevenueGrossSani,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        otherRevenueElectricalControl: new FormControl(
          this.data.otherRevenueElectrical,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        otherRevenueShowerControl: new FormControl(
          this.data.otherRevenueShower,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes),
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
        notes: this.form.get('varianceNotesControl'),
      });

      this.calculateTotals();
      super.subscribeToChanges(() => {
        this.calculateTotals();
      })
  }

  calculateTotals() {
    this.partyAttendanceTotal =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.fields.campingPartyNightsAttendanceStandard.value,
          this.fields.campingPartyNightsAttendanceSenior.value,
          this.fields.campingPartyNightsAttendanceSocial.value,
          this.fields.campingPartyNightsAttendanceLongStay.value,
        ],
        this.data?.config?.attendanceModifier
      );
    this.vehicleAttendanceTotal =
      this.formulaService.frontcountryCampingSecondCarAttendance([
        this.fields.secondCarsAttendanceStandard.value,
        this.fields.secondCarsAttendanceSenior.value,
        this.fields.secondCarsAttendanceSocial.value,
      ]);
    this.partyRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.campingPartyNightsRevenueGross.value,
    ]);
    this.vehicleRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.secondCarsRevenueGross.value,
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.otherRevenueGrossSani.value,
      this.fields.otherRevenueElectrical.value,
      this.fields.otherRevenueShower.value,
    ]);
  }

  async onSubmit() {
    this.loading = true;
    await super.submit();
    this.loading = false;
  }
}
