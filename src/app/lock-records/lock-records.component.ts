import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { FiscalYearLockService } from '../services/fiscal-year-lock.service';
import { Constants } from '../shared/utils/constants';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DateTime, Duration } from 'luxon';

@Component({
    selector: 'app-lock-records',
    templateUrl: './lock-records.component.html',
    styleUrls: ['./lock-records.component.scss'],
    standalone: false
})
export class LockRecordsComponent {

  private subscriptions = new Subscription();
  public loading = true;
  public fiscalYearsList: any[] = [];
  public tz = Constants.timezone;
  public maxDate = DateTime.now().setZone(this.tz);

  public form = new UntypedFormGroup({
    year: new UntypedFormControl(null)
  })

  // negate duration so we can pick the end date first
  public duration = Duration.fromObject({years: 1}).negate();
  public dateFormat = 'yyyy-LL';

  constructor(
    protected dataService: DataService,
    protected fiscalYearLockService: FiscalYearLockService
  ) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA)
        .subscribe((res) => {
          this.fiscalYearsList = res;
        })
    );
    this.subscriptions.add(
      this.form.controls['year'].valueChanges.subscribe((changes) => {
          const startDate = DateTime.fromFormat(changes[1], this.dateFormat).plus({months: 2});
          const endDate = DateTime.fromFormat(changes[0], this.dateFormat).plus({months: 3});
          this.form.controls['year'].setValue([
            startDate.toFormat(this.dateFormat),
            endDate.toFormat(this.dateFormat),
          ],
          {
            emitEvent: false
          })
      })
    )
  }

  submit() {
    const year = this.form.controls['year'].value[1].slice(0,4);
    this.fiscalYearLockService.lockUnlockFiscalYear(year, true);
  }
}
