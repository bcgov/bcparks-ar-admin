import { Component, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { DataService } from 'src/app/services/data.service';
import { Constants } from '../../utils/constants';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected breadcrumbService = inject(BreadcrumbService);
  protected dataService = inject(DataService);

  private subscriptions = new Subscription();
  private enterDataUrlParams;

  public currentNavigation: any;

  public breadcrumbs: any[] = [];
  public lastBreadcrumb: { label: String; url: String };

  constructor() {
    const breadcrumbService = this.breadcrumbService;
    const dataService = this.dataService;

    this.subscriptions.add(
      breadcrumbService.breadcrumbs.subscribe((res) => {
        this.breadcrumbs = res;
        this.lastBreadcrumb = this.breadcrumbs.pop();
        if (this.lastBreadcrumb?.label !== 'Home') {
          this.breadcrumbs.unshift({
            label: 'Home',
            url: '',
          });
        }
      })
    );
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ENTER_DATA_URL_PARAMS)
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
    this.subscriptions.unsubscribe();
  }
}
