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
import { formulaResult, FormulaService } from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent extends BaseFormComponent {
  public loading = false;
  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public standardRevenueTotal: formulaResult = { result: null, formula: '' };
  public youthRevenueTotal: formulaResult = { result: null, formula: '' };
  
  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected formulaService: FormulaService
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      subAreaService,
      formulaService
    );
    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_GROUP_CAMPING)
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
    (this.postObj['activity'] = 'Group Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        standardRateGroupsTotalPeopleStandardControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleStandard,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleAdultsControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleAdults,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleYouthControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleYouth,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleKidsControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleKids,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsRevenueGrossControl: new FormControl(
          this.data.standardRateGroupsRevenueGross,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        youthRateGroupsAttendanceGroupNightsControl: new FormControl(
          this.data.youthRateGroupsAttendanceGroupNights,
          Validators.pattern('^[0-9]*$')
        ),
        youthRateGroupsAttendancePeopleControl: new FormControl(
          this.data.youthRateGroupsAttendancePeople,
          Validators.pattern('^[0-9]*$')
        ),
        youthRateGroupsRevenueGrossControl: new FormControl(
          this.data.youthRateGroupsRevenueGross,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        standardRateGroupsTotalPeopleStandard: this.form.get(
          'standardRateGroupsTotalPeopleStandardControl'
        ),
        standardRateGroupsTotalPeopleAdults: this.form.get(
          'standardRateGroupsTotalPeopleAdultsControl'
        ),
        standardRateGroupsTotalPeopleYouth: this.form.get(
          'standardRateGroupsTotalPeopleYouthControl'
        ),
        standardRateGroupsTotalPeopleKids: this.form.get(
          'standardRateGroupsTotalPeopleKidsControl'
        ),
        standardRateGroupsRevenueGross: this.form.get(
          'standardRateGroupsRevenueGrossControl'
        ),
        youthRateGroupsAttendanceGroupNights: this.form.get(
          'youthRateGroupsAttendanceGroupNightsControl'
        ),
        youthRateGroupsAttendancePeople: this.form.get(
          'youthRateGroupsAttendancePeopleControl'
        ),
        youthRateGroupsRevenueGross: this.form.get(
          'youthRateGroupsRevenueGrossControl'
        ),
        notes: this.form.get('varianceNotesControl'),
      });

      this.calculateTotals();
      super.subscribeToChanges(() => {
        this.calculateTotals();
      })
  }

  calculateTotals(){
    this.attendanceTotal = this.formulaService.groupCampingStandardAttendance([
      this.fields.standardRateGroupsTotalPeopleAdults.value,
      this.fields.standardRateGroupsTotalPeopleYouth.value,
      this.fields.standardRateGroupsTotalPeopleKids.value,
    ]);
    this.standardRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.standardRateGroupsRevenueGross.value
    ]);
    this.youthRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.youthRateGroupsRevenueGross.value
    ])
  }

  async onSubmit() {
    this.loading = true;
    await super.submit();
    this.loading = false;
  }
}
