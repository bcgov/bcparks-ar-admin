import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SubAreaService } from 'src/app/services/sub-area.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public currentNavigation: any;

  public breadcrumbs: any[] = [];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected breadcrumbService: BreadcrumbService,
    protected subAreaService: SubAreaService
  ) {
    this.subscriptions.push(
      breadcrumbService.breadcrumbs
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.breadcrumbs = res;
        })
    );
  }

  onNavigate(route) {
    switch (route) {
      case '/enter-data':
        this.subAreaService.clearAccordionCache();
        break;
      default:
        break;
    }
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
