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
  selector: 'app-boating',
  templateUrl: './boating.component.html',
  styleUrls: ['./boating.component.scss'],
})
export class BoatingComponent extends BaseFormComponent implements OnDestroy {
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

  private alive = true;
  private subscriptions: any[] = [];

  constructor(
    protected fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private router: Router
  ) {
    super(fb);
    this._form = this.boatingForm;
    this._fields = this.boatingFields;
    // TODO: populate this with incoming data.
    this._formName = 'Boating Form';

    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this._postObj = res;
            this._postObj['activity'] = 'Boating';
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
