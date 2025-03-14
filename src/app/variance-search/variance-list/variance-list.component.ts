import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { DateTime } from 'luxon';
import { Constants } from 'src/app/shared/utils/constants';
import { DataService } from 'src/app/services/data.service';
import { VarianceService } from 'src/app/services/variance.service';

@Component({
    selector: 'app-variance-list',
    templateUrl: './variance-list.component.html',
    styleUrls: ['./variance-list.component.scss'],
    standalone: false
})
export class VarianceListComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  public rowSchema: any[];
  public subscriptions = new Subscription();
  public loading = false;
  public parks;
  public variances: any[] = [];
  public lastEvaluatedKey = null;

  @ViewChild('viewButton') viewButton: TemplateRef<any>;
  @ViewChild('resolvedStatusTemplate') resolvedStatusTemplate: TemplateRef<any>;

  constructor(
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
    private dataService: DataService,
    private router: Router,
    private varianceService: VarianceService
  ) {

    this.subscriptions.add(
      this.loadingService.getLoadingStatus().subscribe(status => {
        if (status) {
          // TODO: set this to 'status'
          this.loading = false;
        }
      })
    )
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.VARIANCE_LIST).subscribe((res) => {
        if (res) {
          this.variances = res;
          this.createTableRows(this.variances);
        } else {
          this.variances = null;
        }
      })
    )
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.VARIANCE_LAST_EVALUATED_KEY).subscribe((res) => {
        if (res) {
          this.lastEvaluatedKey = res;
        }
      })
    )
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_PARK).subscribe((res) => {
        if (res) {
          this.parks = res;
        }
      })
    )
  }

  ngAfterViewInit() {
    this.rowSchema = [
      {
        id: 'date', // column identifier
        displayHeader: 'Date', // table header display name
        dropdown: 0, // when does this column collapse into the dropdown? 0-never, 1-mobile, 2<xs, 3<sm, 4<md, 5<lg, 6<xl, 7-always
        columnClasses: 'col', // additional column classes - for column sizing at different screen sizes
        display: (row) => {
          return this.formatDate(row.pk.split('::')[2])
        }, // returns what to display in the cell as a function of the row data
        key: 'date' // value of pass object associated with column
      },
      {
        id: 'park',
        displayHeader: 'Park',
        dropdown: 4,
        columnClasses: 'col',
        key: 'parkName'
      },
      {
        id: 'subarea',
        dropdown: 0,
        columnClasses: 'col',
        displayHeader: 'Subarea',
        key: 'subAreaName'
      },
      {
        id: 'activity',
        dropdown: 3,
        columnClasses: 'col',
        displayHeader: 'Activity',
        key: 'activity'
      },
      {
        id: 'viewButton',
        dropdown: 0,
        columnClasses: 'col-auto',
        template: this.viewButton,
        divider: true
      }
    ];
    this.setWidth();
    this.cd.detectChanges();
  }

  ngAfterViewChecked() {
    this.setWidth();
  }

  createTableRows(varRecords) {
    // populate metadata for variance records
    // let subareas = this.dataService.getItemValue(Constants.dataIds.CURRENT_SUBAREA_LIST);
    for (const record of varRecords) {
      // get get subarea information
      let subAreaId = record.sk.split('::')[0];
      let activity = record.sk.split('::')[1];
      record.subAreaId = subAreaId;
      record.subAreaName = record.subAreaName;
      record.date = record.pk.split('::')[2];
      record.activity = activity;
    }
  }

  formatDate(date) {
    let d = DateTime.fromFormat(date, 'yyyyMM');
    return d.toFormat('MMMM yyyy');
  }

  formatActivityForUrl(activity) {
    return activity?.replace(/\s/g, '-').toLowerCase();
  }

  viewRecord(record) {
    // TODO: find a better way to do this
    let activityUrl = this.formatActivityForUrl(record.activity)
    this.router.navigate([`/enter-data/${activityUrl}`], {
      queryParams: {
        date: record.date,
        orcs: record.orcs,
        subAreaId: record.subAreaId,
        subAreaName: record.subAreaName,
        parkName: record.parkName,
      }
    })
  }

  setWidth() {
    let columns = [...this.rowSchema];
    // don't forget about the cancel button column
    columns.push({ id: 'resolvedStatusButton' });
    // get groups of column ids
    for (const col of columns) {
      const columns = document.querySelectorAll<HTMLElement>(`#${col.id}`);
      let maxWidth = 0;
      for (let i = 0; i < columns.length; i++) {
        maxWidth = Math.max(maxWidth, columns[i].scrollWidth);
      }
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].style.minWidth) {
          columns[i].style.width = columns[i].style.minWidth + 'px';
        } else {
          columns[i].style.width = maxWidth + 'px';
        }
      }
    }
  }

  loadMore() {
    const currentFilters = { lastEvaluatedKey: this.lastEvaluatedKey, ...this.dataService.getItemValue(Constants.dataIds.VARIANCE_FILTERS) };
    this.varianceService.fetchVariance(currentFilters);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

  }
}
