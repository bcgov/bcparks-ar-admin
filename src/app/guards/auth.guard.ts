import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly router: Router
  ) {}

  canActivate(): true | UrlTree {
    if (this.keycloakService.isAuthenticated()) {
      return true;
    }

    return this.router.parseUrl('/unauthorized');
  }
}
