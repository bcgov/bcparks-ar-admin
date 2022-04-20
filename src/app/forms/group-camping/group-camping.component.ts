import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent extends BaseFormComponent implements OnInit {
  public groupCampingForm = new FormGroup({
    standardRateGroupsTotalPeopleStandardControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    standardRateGroupsTotalPeopleAdultsControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    standardRateGroupsTotalPeopleYouthControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    standardRateGroupsTotalPeopleKidsControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    standardRateGroupsRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    youthRateGroupsAttendanceGroupNightsControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    youthRateGroupsAttendancePeopleControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    youthRateGroupsRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public groupCampingFields: any = {
    standardRateGroupsTotalPeopleStandard: this.groupCampingForm.get(
      'standardRateGroupsTotalPeopleStandardControl'
    ),
    standardRateGroupsTotalPeopleAdults: this.groupCampingForm.get(
      'standardRateGroupsTotalPeopleAdultsControl'
    ),
    standardRateGroupsTotalPeopleYouth: this.groupCampingForm.get(
      'standardRateGroupsTotalPeopleYouthControl'
    ),
    standardRateGroupsTotalPeopleKids: this.groupCampingForm.get(
      'standardRateGroupsTotalPeopleKidsControl'
    ),
    standardRateGroupsRevenueGross: this.groupCampingForm.get(
      'standardRateGroupsRevenueGrossControl'
    ),
    youthRateGroupsAttendanceGroupNights: this.groupCampingForm.get(
      'youthRateGroupsAttendanceGroupNightsControl'
    ),
    youthRateGroupsAttendancePeople: this.groupCampingForm.get(
      'youthRateGroupsAttendancePeopleControl'
    ),
    youthRateGroupsRevenueGross: this.groupCampingForm.get(
      'youthRateGroupsRevenueGrossControl'
    ),
    notes: this.groupCampingForm.get('varianceNotesControl'),
  };

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.groupCampingForm),
      (this._fields = this.groupCampingFields),
      (this._formName = 'Group Camping Form');
    // TODO: populate this with incoming data later
    this._postObj = {
      date: '202201',
      parkName: 'Mt Assiniboine',
      subAreaName: 'Naiset Cabins',
      type: 'activity',
      orcs: '0005',
      activity: 'Group Camping',
    };
  }

  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
