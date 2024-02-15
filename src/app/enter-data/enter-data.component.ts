import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnDestroy {
  private subscriptions = new Subscription();
  public subAreaData;

  public onChildRoute = false;
  public formParams = {
    parkName: '',
    subAreaName: '',
    date: '',
    orcs: '',
    subAreaId: '',
    isLegacy: false,
  };
  public utils = new Utils();

  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past enteries, you can do that by selecting
  the date and location you want to view.`;

  constructor(protected dataService: DataService, protected router: Router) {
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
      dataService
        .watchItem(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .subscribe((res) => {
          if (res) {
            this.formParams = res;
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
