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
  public results;

  public boatingForm = new FormGroup({
    nightsOnDockControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    nightsOnBuoyControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    miscellaneousBoatsControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
    grossBoatingRevenueControl: new FormControl(
      '',
      Validators.pattern('^[0-9]*$')
    ),
  });

  constructor(protected fb: FormBuilder) {
    super(fb);
    this._form = this.boatingForm;
    this._formName = 'Boating Form';
  }

  ngOnInit(): void {}

  test() {
    this.results = super.submit();
    console.log(this.results);
  }
}
