import { Component, HostBinding, OnDestroy } from '@angular/core';
import { SideBarService } from 'src/app/services/sidebar.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent implements OnDestroy {
  @HostBinding('class.is-toggled')
  public hide = false;

  public routes: any[] = [];
  public currentRoute: any;

  private subscriptions = new Subscription();

  constructor(
    protected sideBarService: SideBarService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected keyCloakService: KeycloakService
  ) {
    this.routes = router.config.filter(function (obj) {
      if (obj.path === 'export-reports') {
        return keyCloakService.isAllowed('export-reports');
      } else if (obj.path === 'lock-records') {
        return keyCloakService.isAllowed('lock-records');
      } else if (obj.path === 'review-data') {
        return keyCloakService.isAllowed('review-data');
      } else if (obj.path === 'manage-subareas') {
        return keyCloakService.isAllowed('manage-subareas');
      } else if (obj.path === 'login') {
        return keyCloakService.isAuthenticated() ? false : true;
      } else {
        return obj.path !== '**' && obj.path !== 'unauthorized';
      }
    });

    this.subscriptions.add(
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: Event) => {
          this.currentRoute = this.getPathFromUrl(event['url']);
        })
    );

    this.subscriptions.add(
      sideBarService.toggleChange.subscribe((hide) => {
        this.hide = hide;
      })
    );
  }

  onNavigate(route) {
    switch (route) {
      case 'enter-data':
        this.subAreaService.clearAccordionCache();
        break;
      default:
        break;
    }
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getPathFromUrl(url) {
    return url.split('?')[0];
  }
}
