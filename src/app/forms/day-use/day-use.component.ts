import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-day-use',
  templateUrl: './day-use.component.html',
  styleUrls: ['./day-use.component.scss'],
})
export class DayUseComponent extends BaseFormComponent implements OnInit {
  public dayUseForm = new FormGroup({
    peopleAndVehiclesTrailControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    peopleAndVehiclesVehicleControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    peopleAndVehiclesBusControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    picnicRevenueShelterControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    picnicRevenueGrossControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherDayUseRevenueSkiiControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    otherDayUseRevenueHotSpringsControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public dayUseFields: any = {
    peopleAndVehiclesTrail: this.dayUseForm.get(
      'peopleAndVehiclesTrailControl'
    ),
    peopleAndVehiclesVehicle: this.dayUseForm.get(
      'peopleAndVehiclesVehicleControl'
    ),
    peopleAndVehiclesBus: this.dayUseForm.get('peopleAndVehiclesBusControl'),
    picnicRevenueShelter: this.dayUseForm.get('picnicRevenueShelterControl'),
    picnicRevenueGross: this.dayUseForm.get('picnicRevenueGrossControl'),
    otherDayUseRevenueSkii: this.dayUseForm.get(
      'otherDayUseRevenueSkiiControl'
    ),
    otherDayUseRevenueHotSprings: this.dayUseForm.get(
      'otherDayUseRevenueHotSpringsControl'
    ),
    notes: this.dayUseForm.get('varianceNotesControl'),
  };

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.dayUseForm),
      (this._fields = this.dayUseFields),
      (this._formName = 'Day Use Form');
    // TODO: populate this with incoming data later
    this._postObj = {
      date: '202201',
      parkName: 'Mt Assiniboine',
      subAreaName: 'Naiset Cabins',
      type: 'activity',
      orcs: '0005',
      activity: 'Day Use',
    };
  }
  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
