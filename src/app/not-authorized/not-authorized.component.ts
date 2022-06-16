import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {
  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit() {
    if (this.keycloakService.isAuthenticated()) {
      console.log('not-authorized:authenticated');
      if (this.keycloakService.isAuthorized()) {
        console.log('not-authorized::authenticated && authorized');
        this.router.navigate(['/']);
        return;
      }
    } else {
      console.log('not-authorized:not authenticated');
      this.router.navigate(['/login']);
      return;
    }
  }

}
