import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';
import { UrlService } from '../services/url.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public subAreaData;

  public onChildRoute = false;
  public urlParams;
  public utils = new Utils();

  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past enteries, you can do that by selecting
  the date and location you want to view.`;

  constructor(protected dataService: DataService, protected router: Router, protected urlService: UrlService) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .subscribe((res) => {
          this.subAreaData = res;
        })
    );

    this.subscriptions.add(
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.onChildRoute =
            event.url.split('?')[0] !== '/enter-data' ? true : false;
        })
    );
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .subscribe((res) => {
          if (res) {
            this.urlParams = res;
          }
        })
    );
  }

  ngOnInit(): void {
    this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS, this.urlService.getQueryParams());
  }

  formatDate(date): string {
    if (date) {
      return DateTime.fromFormat(date, 'yyyyLL').toFormat('LLLL yyyy');
    }
    return '-';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
