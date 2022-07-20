import { Component, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Input() showSideBar = true;
  
  private subscriptions = new Subscription();

  public envName: string;
  public showBanner = true;
  public welcomeMsg: String;
  public isAuthorized: boolean;
  public isMenuCollapsed = true;
  public routes: any[] = [];
  public currentRoute: any;

  constructor(
    protected configService: ConfigService,
    protected router: Router,
    protected keycloakService: KeycloakService
  ) {
    this.routes = router.config.filter(function (obj) {
      if (obj.path === 'export-reports') {
        return keycloakService.isAllowed('export-reports');
      } else {
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
    if (this.envName === 'prod') {
      this.showBanner = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
