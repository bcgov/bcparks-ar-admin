import { Component, Input, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, Router, Event, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [RouterLink, NgbCollapse, NgClass]
})
export class HeaderComponent implements OnDestroy {
  protected configService = inject(ConfigService);
  protected router = inject(Router);
  protected keycloakService = inject(KeycloakService);

  @Input() showSideBar = true;
  
  private subscriptions = new Subscription();

  public envName: string;
  public showBanner = true;
  public welcomeMsg: String;
  public isAuthorized: boolean;
  public isMenuCollapsed = true;
  public routes: any[] = [];
  public currentRoute: any;

  constructor() {
    const router = this.router;
    const keycloakService = this.keycloakService;

    this.routes = router.config.filter(function (obj) {
      if (obj.path === 'export-reports') {
        return keycloakService.isAllowed('export-reports');
      } else if (obj.path === 'lock-records') {
        return keycloakService.isAllowed('lock-records')
      }
        {
        return obj.path !== '**' && obj.path !== 'unauthorized';
      }
    });

    this.subscriptions.add(
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: Event) => {
          this.currentRoute = event;
        })
    );

    this.isAuthorized = this.keycloakService.isAuthorized();
    this.welcomeMsg = this.keycloakService.getWelcomeMessage();

    this.envName = this.configService.config['ENVIRONMENT'];
    if (this.envName === 'prod' || this.envName === 'lza-prod') {
      this.showBanner = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
