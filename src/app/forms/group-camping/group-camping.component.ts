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
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent extends BaseFormComponent {
  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService
  ) {
    super(formBuilder, formService, router, dataService, subAreaService);

    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_GROUP_CAMPING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
          }
        })
    );

    // declare activity type
    (this.postObj['activity'] = 'Group Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        standardRateGroupsTotalPeopleStandardControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleStandard || null,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleAdultsControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleAdults || null,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleYouthControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleYouth || null,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsTotalPeopleKidsControl: new FormControl(
          this.data.standardRateGroupsTotalPeopleKids || null,
          Validators.pattern('^[0-9]*$')
        ),
        standardRateGroupsRevenueGrossControl: new FormControl(
          this.data.standardRateGroupsRevenueGross || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        youthRateGroupsAttendanceGroupNightsControl: new FormControl(
          this.data.youthRateGroupsAttendanceGroupNights || null,
          Validators.pattern('^[0-9]*$')
        ),
        youthRateGroupsAttendancePeopleControl: new FormControl(
          this.data.youthRateGroupsAttendancePeople || null,
          Validators.pattern('^[0-9]*$')
        ),
        youthRateGroupsRevenueGrossControl: new FormControl(
          this.data.youthRateGroupsRevenueGross || null,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes || null),
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
  }

  public loading = false;

  async onSubmit() {
    this.loading = true;
    await super.submit();
    this.loading = false;
  }
}
