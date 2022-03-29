import { Component, HostBinding, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { SideBarService } from 'src/app/services/sidebar.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  @HostBinding('class.is-toggled')
  public hide = false;

  public routes: any[] = [];
  public currentRoute: any;

  private alive = true;

  private subscriptions: any[] = [];

  constructor(
    protected sideBarService: SideBarService,
    protected router: Router
  ) {
    this.routes = router.config.filter(function (obj) {
      return obj.path !== '**' && obj.path !== 'unauthorized';
    });

    this.subscriptions.push(
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .pipe(takeWhile(() => this.alive))
        .subscribe((event: Event) => {
          this.currentRoute = event;
        })
    );

    this.subscriptions.push(
      sideBarService.toggleChange
        .pipe(takeWhile(() => this.alive))
        .subscribe((hide) => {
          this.hide = hide;
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
