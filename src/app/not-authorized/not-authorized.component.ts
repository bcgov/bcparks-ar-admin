import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Component({
    selector: 'app-not-authorized',
    templateUrl: './not-authorized.component.html',
    styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {
  private router = inject(Router);
  private keycloakService = inject(KeycloakService);


  ngOnInit() {
    if (this.keycloakService.isAuthenticated()) {
      if (this.keycloakService.isAuthorized()) {
        this.router.navigate(['/']);
        return;
      }
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

}
