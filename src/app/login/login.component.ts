import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public keycloakService: KeycloakService, private router: Router) {}

  ngOnInit() {
    if (this.keycloakService.isAuthenticated()) {
      if (this.keycloakService.isAuthorized()) {
        console.log('login::authorized && authenticated');
        this.router.navigate(['/']);
        return;
      } else {
        console.log('login::not authorized');
        this.router.navigate(['/unauthorized']);
        return;
      }
    }
  }

  handleLogin(idpHint: string) {
    this.keycloakService.login(idpHint);
  }
}
