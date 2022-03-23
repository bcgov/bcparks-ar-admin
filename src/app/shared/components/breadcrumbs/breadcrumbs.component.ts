import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as NavigationEvent,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  private routes: any[] = [];
  // TODO: Have this be set by a service
  public toggleButtonExists = true;

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

  ngOnInit(): void {}
}
