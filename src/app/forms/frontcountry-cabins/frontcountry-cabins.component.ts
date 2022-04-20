import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-frontcountry-cabins',
  templateUrl: './frontcountry-cabins.component.html',
  styleUrls: ['./frontcountry-cabins.component.scss'],
})
export class FrontcountryCabinsComponent
  extends BaseFormComponent
  implements OnInit
{
  public frontcountryCabinsForm = new FormGroup({
    totalAttendancePartiesControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    revenueGrossCampingControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public frontcountryCabinsFields: any = {
    totalAttendanceParties: this.frontcountryCabinsForm.get(
      'totalAttendancePartiesControl'
    ),
    revenueGrossCamping: this.frontcountryCabinsForm.get(
      'revenueGrossCampingControl'
    ),
    notes: this.frontcountryCabinsForm.get('varianceNotesControl'),
  };

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.frontcountryCabinsForm),
      (this._fields = this.frontcountryCabinsFields),
      (this._formName = 'Frontcountry Cabins Form');
    // TODO: populate this with incoming data later
    this._postObj = {
      date: '202201',
      parkName: 'Mt Assiniboine',
      subAreaName: 'Naiset Cabins',
      type: 'activity',
      orcs: '0005',
      activity: 'Frontcountry Cabins',
    };
  }

  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
