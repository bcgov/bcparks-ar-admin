import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // When a successful login occurs, we store the identity provider used in sessionStorage.
    const lastIdp = sessionStorage.getItem(
      this.keycloakService.LAST_IDP_AUTHENTICATED
    );

    // Not authenticated
    if (!this.keycloakService.isAuthenticated()) {
      if (lastIdp === null) {
        // If an identity provider hasn't been selected then show the login page.
        return this.router.parseUrl('/login');
      }
      // If an identity provider was already selected and successfully authenticated
      // then do a keycloak login with that identity provider.

      // remove the sessionStorage value first, so if this authentication attempt
      // fails then the user will get the login page next time.
      sessionStorage.removeItem(this.keycloakService.LAST_IDP_AUTHENTICATED);

      // log in using the last identity provider that worked
      this.keycloakService.login(lastIdp);
      return false;
    }

    if (lastIdp === null) {
      // Store the identity provider that was used to successfully log in.
      // Even if the user is unauthorized, we still want to store this because
      // we don't have a logout, so there is no point allowing the user to select
      // a different IDP, as Keycloak will just ignore the selection when the user
      // is authenticated already.
      const idp = this.keycloakService.getIdpFromToken();
      if (idp !== '') {
        sessionStorage.setItem(
          this.keycloakService.LAST_IDP_AUTHENTICATED,
          idp
        );
      }
    }

    // Not authorized
    if (!this.keycloakService.isAuthorized()) {
      // login was successful but the user doesn't have necessary Keycloak roles.
      return this.router.parseUrl('/unauthorized');
    }

    if (!this.keycloakService.isAllowed('export-reports') && state.url === '/export-reports') {
      return this.router.parseUrl('/');
    }

    // Show the requested page.
    return true;
  }
}
