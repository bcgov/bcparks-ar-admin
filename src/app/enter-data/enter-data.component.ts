import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';
import { UrlService } from '../services/url.service';
import { DateTime } from 'luxon';
import { SubAreaSearchComponent } from './sub-area-search/sub-area-search.component';
import { CenteredTextBlockComponent } from '../shared/components/centered-text-block/centered-text-block.component';
import { AccordionManagerComponent } from './accordion-manager/accordion-manager.component';

@Component({
    selector: 'app-enter-data',
    templateUrl: './enter-data.component.html',
    styleUrls: ['./enter-data.component.scss'],
    imports: [SubAreaSearchComponent, CenteredTextBlockComponent, AccordionManagerComponent, RouterOutlet]
})
export class EnterDataComponent implements OnInit, OnDestroy {
  protected dataService = inject(DataService);
  protected router = inject(Router);
  protected urlService = inject(UrlService);

  private subscriptions = new Subscription();
  public subAreaData;

  public onChildRoute = false;
  public urlParams;
  public utils = new Utils();

  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past entries, you can do that by selecting
  the date and location you want to view.`;

  constructor() {
    const dataService = this.dataService;
    const router = this.router;

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
