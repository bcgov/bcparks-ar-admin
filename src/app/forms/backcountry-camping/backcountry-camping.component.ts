import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';

@Component({
  selector: 'app-backcountry-camping',
  templateUrl: './backcountry-camping.component.html',
  styleUrls: ['./backcountry-camping.component.scss'],
})
export class BackcountryCampingComponent extends BaseFormComponent implements OnInit {
  public backcountryCampingForm = new FormGroup({
    peopleControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    grossCampingRevenueControl: new FormControl(
      '',
      Validators.pattern('/^-?(0|[1-9]d*)?$/')
    ),
    varianceNotesControl: new FormControl(''),
  })

  public backcountryCampingFields: any = {
    people: this.backcountryCampingForm.get('peopleControl'),
    grossCampingRevenue: this.backcountryCampingForm.get('grossCampingRevenueControl'),
    notes: this.backcountryCampingForm.get('varianceNotesControl')
  }

  constructor(protected fb: FormBuilder) {
    super(fb);
    (this._form = this.backcountryCampingForm),
    (this._fields = this.backcountryCampingFields),
    (this._formName = 'Backcountry Camping Form');
    // TODO: populate this with incoming data later
    this._postObj = {
      date: '202201',
      parkName: 'Mt Assiniboine',
      subAreaName: 'Naiset Cabins',
      type: 'activity',
      orcs: '0005',
      activity: 'Backcountry Camping',
    };
  }

  ngOnInit(): void {}
  
  test() {
    console.log(super.submit());
  }
}
