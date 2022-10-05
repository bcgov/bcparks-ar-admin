import { Component, OnInit } from '@angular/core';
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
  public fiscalYearRangeString = 'Select a fiscal year';

  constructor(
    protected dataService: DataService,
    protected fiscalYearLockService: FiscalYearLockService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA)
        .subscribe((res) => {
          this.fiscalYearsList = res;
        })
    );
  }

  ngOnInit(): void {
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
    const displayRange = `${startDate} - ${endDate}`;
    this.fiscalYearRangeString = displayRange;
  }

  submit() {
    this.fiscalYearLockService.lockUnlockFiscalYear(this.modelDate, true);
  }
}
