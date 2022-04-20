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
  selector: 'app-group-camping',
  templateUrl: './group-camping.component.html',
  styleUrls: ['./group-camping.component.scss'],
})
export class GroupCampingComponent
  extends BaseFormComponent
  implements OnDestroy
{
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

  private alive = true;
  private subscriptions: any[] = [];

  constructor(
    protected fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private router: Router
  ) {
    super(fb);
    (this._form = this.groupCampingForm),
      (this._fields = this.groupCampingFields),
      (this._formName = 'Group Camping Form');

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Group Camping';
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
