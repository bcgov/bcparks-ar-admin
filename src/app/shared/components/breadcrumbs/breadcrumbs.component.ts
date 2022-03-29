import { Component, OnDestroy } from '@angular/core';
import {
  Router,
  Event as NavigationEvent,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { takeWhile } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnDestroy{
  private routes: any[] = [];
  private alive = true;
  private subscriptions: any[] = [];

  // TODO: Have this be set by a service
  // public toggleButtonExists = true;

  public currentNavigation: any;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {
    this.routes = router.config.filter(function (obj) {
      return obj.path !== '**';
    });

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(takeWhile(() => this.alive))
      .subscribe((event: NavigationEvent) => {
        let navArray = (event as NavigationEnd).url.split('/');
        navArray.shift();

        this.currentNavigation = [];

        // TODO: We need to account for child routes
        // Also double for loop sucks
        for (let i = 0; i < navArray.length; i++) {
          const nav = navArray[i];
          for (var j = 0; j < this.routes.length; j++) {
            if (this.routes[j].path == nav) {
              this.currentNavigation.push({
                path: this.routes[j].path,
                label: this.routes[j].data.label,
              });
              break;
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
