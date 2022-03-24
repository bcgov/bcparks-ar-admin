import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public envName: string;
  public showBanner = true;
  public welcomeMsg: String;
  public isAuthenticated: boolean;

  constructor(
    protected configService: ConfigService,
    protected router: Router,
    protected keycloakService: KeycloakService
  ) {
    router.events.subscribe(() => {
      this.isAuthenticated = this.keycloakService.isAuthenticated();
      this.welcomeMsg = this.keycloakService.getWelcomeMessage();
    });

    this.envName = this.configService.config['ENVIRONMENT'];
    if (this.envName === 'prod') {
      this.showBanner = false;
    }
  }
}
