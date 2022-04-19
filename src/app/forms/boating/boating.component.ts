import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-boating',
  templateUrl: './boating.component.html',
  styleUrls: ['./boating.component.scss'],
})
export class BoatingComponent extends BaseFormComponent implements OnInit {
  public boatingForm = new FormGroup({
    nightsOnDockControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    nightsOnBuoyControl: new FormControl('', Validators.pattern('^[0-9]*$')),
    miscellaneousBoatsControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    grossBoatingRevenueControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  });

  public boatingFields: any = {
    boatAttendanceNightsOnDock: this.boatingForm.get('nightsOnDockControl'),
    boatAttendanceNightsOnBouys: this.boatingForm.get('nightsOnBuoyControl'),
    boatAttendanceMiscellaneous: this.boatingForm.get(
      'miscellaneousBoatsControl'
    ),
    boatRevenueGross: this.boatingForm.get('grossBoatingRevenueControl'),
    notes: this.boatingForm.get('varianceNotesControl'),
  };

  constructor(protected fb: FormBuilder) {
    super(fb);
    this._form = this.boatingForm;
    this._fields = this.boatingFields;
    // TODO: populate this with incoming data.
    this._formName = 'Boating Form';
    this._postObj = {
      type: 'activity',
      orcs: 1234,
      subAreaName: 'Golden Ears Main Road',
      activity: 'Boating',
      date: '202205',
    };
  }

  ngOnInit(): void {}

  test() {
    console.log(super.submit());
  }
}
