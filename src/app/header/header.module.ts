import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { KeycloakService } from '../services/keycloak.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, HeaderComponent],
    exports: [HeaderComponent],
    providers: [KeycloakService],
})
export class HeaderModule {}
