import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];
  public subAreaData;

  public onChildRoute = false;
  public formParams;
  public utils = new Utils();

  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past enteries, you can do that by selecting
  the date and location you want to view.`;

  constructor(protected dataService: DataService, protected router: Router) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.subAreaData = res;
        })
    );

    this.subscriptions.push(
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .pipe(takeWhile(() => this.alive))
        .subscribe((event: any) => {
          this.onChildRoute =
            event.url.split('?')[0] !== '/enter-data' ? true : false;
        })
    );

    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.formParams = res;
          }
        })
    );
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
