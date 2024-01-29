import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils/utils';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { FiscalYearLockService } from '../services/fiscal-year-lock.service';
import { Constants } from '../shared/utils/constants';

@Component({
  selector: 'app-lock-records',
  templateUrl: './lock-records.component.html',
  styleUrls: ['./lock-records.component.scss'],
})
export class LockRecordsComponent implements OnInit {
  
  private subscriptions = new Subscription();
  public fiscalYearStartMonth = 'April';
  public fiscalYearEndMonth = 'March';
  public loading = true;
  public fiscalYearsList: any[] = [];
  public modelDate = NaN;
  public maxDate = new Date();
  private utils = new Utils();
  public defaultRangeString = 'Select fiscal year';
  public fiscalYearRangeString = this.defaultRangeString;

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
  }

  ngOnInit(): void {
    this.maxDate = this.utils.getLatestLockableFiscalYear(new Date());
    this.fiscalYearLockService.fetchFiscalYear();
  }

  onOpenCalendar(container) {
    container.setViewMode('year');
  }

  datePickerOutput(event) {
    const selectedYear = new Date(event).getFullYear();
    this.modelDate = selectedYear;
    const startDate = this.fiscalYearStartMonth + ' ' + (selectedYear - 1);
    const endDate = this.fiscalYearEndMonth + ' ' + selectedYear;
    const displayRange = `${startDate}–${endDate}`;
    this.fiscalYearRangeString = displayRange;
  }

  submit() {
    this.fiscalYearLockService.lockUnlockFiscalYear(this.modelDate, true);
    this.modelDate = NaN;
    this.fiscalYearRangeString = this.defaultRangeString;
  }
}
