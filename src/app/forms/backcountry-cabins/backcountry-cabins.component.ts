import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-backcountry-cabins',
  templateUrl: './backcountry-cabins.component.html',
  styleUrls: ['./backcountry-cabins.component.scss'],
})
export class BackcountryCabinsComponent
  extends BaseFormComponent
  implements OnInit
{
  public backcountryCabinsForm = new FormGroup({
    adultAttendanceControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    childAttendanceControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    familyAttendanceControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    grossBackcountryCabinRevenueControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public backcountryCabinsFields: any = {
    peopleAdult: this.backcountryCabinsForm.get('adultAttendanceControl'),
    peopleChild: this.backcountryCabinsForm.get('childAttendanceControl'),
    peopleFamily: this.backcountryCabinsForm.get('familyAttendanceControl'),
    revenueFamily: this.backcountryCabinsForm.get(
      'grossBackcountryCabinRevenueControl'
    ),
    notes: this.backcountryCabinsForm.get('varianceNotesControl'),
  };

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.backcountryCabinsForm),
      (this._fields = this.backcountryCabinsFields),
      (this._formName = 'Backcountry Cabins Form');
    // TODO: populate this with incoming data.
    this._postObj = {
      type: 'activity',
      orcs: 1234,
      subAreaName: 'Golden Ears Main Road',
      activity: 'Backcountry Cabins',
      date: '202205',
    };
  }

  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
