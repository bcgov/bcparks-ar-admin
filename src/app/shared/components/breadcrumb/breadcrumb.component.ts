import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { DataService } from 'src/app/services/data.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];
  private enterDataUrlParams;

  public currentNavigation: any;

  public breadcrumbs: any[] = [];
  public lastBreadcrumb: { label: String; url: String };

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected breadcrumbService: BreadcrumbService,
    protected dataService: DataService
  ) {
    this.subscriptions.push(
      breadcrumbService.breadcrumbs
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.breadcrumbs = res;
          this.lastBreadcrumb = this.breadcrumbs.pop();
          if (this.lastBreadcrumb?.label !== 'Home') {
            this.breadcrumbs.unshift({
              label: 'Home',
              url: '',
            });
          }
        }),
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.enterDataUrlParams = res;
          }
        })
    );
  }

  onNavigate(route) {
    switch (route) {
      case '/enter-data':
        this.router.navigate([route], { queryParams: this.enterDataUrlParams });
        break;
      default:
        this.router.navigate([route]);
        break;
    }
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
