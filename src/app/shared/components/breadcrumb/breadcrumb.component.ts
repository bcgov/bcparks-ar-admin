import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

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
    protected breadcrumbService: BreadcrumbService
  ) {
    this.subscriptions.push(
      breadcrumbService.breadcrumbs
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.breadcrumbs = res;
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
