import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { columnSchema } from 'src/app/shared/components/table/table.component';
import { Constants } from 'src/app/shared/utils/constants';
import { FiscalYearUnlockerComponent } from './fiscal-year-unlocker/fiscal-year-unlocker.component';

@Component({
  selector: 'app-fiscal-year-lock-table',
  templateUrl: './fiscal-year-lock-table.component.html',
  styleUrls: ['./fiscal-year-lock-table.component.scss'],
})
export class FiscalYearLockTableComponent implements OnInit {
  @Input() data: any[];

  private subscriptions = new Subscription();
  public columnSchema: columnSchema[] = [];
  public tableRows: any[] = [];

  constructor(protected dataService: DataService) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA)
        .subscribe((res) => {
          if (res && res.length) {
            this.tableRows = this.filterLockedYears(res);
          }
        })
    );
  }

  ngOnInit(): void {
    this.createColumnSchema();
  }

  filterLockedYears(data) {
    let lockedYears: any[] = [];
    for (const year of data) {
      if (year.isLocked) {
        lockedYears.push(year);
      }
    }
    return lockedYears;
  }

  getFiscalYearString(fiscalYearEnd): string {
    const startYear = Number(fiscalYearEnd) - 1;
    const endYear = String(fiscalYearEnd).substring(2, 4);
    // note that the separator should be an en dash, not a hyphen
    return startYear + '–' + endYear;
  }

  // fiscalYearEndObject schema
  // pk: fiscalYearEnd
  // sk: 2022
  // isLocked: true
  createColumnSchema() {
    this.columnSchema = [
      {
        id: 'year',
        displayHeader: 'Fiscal Year',
        columnClasses: 'ps-3 pe-5',
        mapValue: (row) => row.sk,
        mapDisplay: (row) => this.getFiscalYearString(row.sk),
      },
      {
        id: 'parkName',
        displayHeader: 'Park',
        width: '70%',
        columnClasses: 'px-5',
        mapValue: () => 'All Parks',
      },
      {
        id: 'lockedStatus',
        displayHeader: 'Unlock',
        width: '10%',
        columnClasses: 'ps-5 pe-3',
        mapValue: (row) => row.isLocked,
        cellTemplate: (row) => {
          return {
            component: FiscalYearUnlockerComponent,
            data: {
              data: row,
            },
          };
        },
      },
    ];
  }
}
