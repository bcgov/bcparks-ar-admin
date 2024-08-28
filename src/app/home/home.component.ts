import { Component } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // This can be pulled in via the config.
  public cardConfig = [
    {
      cardHeader: 'Enter Data',
      cardTitle: 'Data input tools',
      cardText:
        'Use this section to enter attendance and revenue and send to BC Parks. You can also view and edit past enteries.',
      navigation: 'enter-data',
    },
  ];
  constructor(protected keyCloakService: KeycloakService) {
    if (keyCloakService.isAllowed('export-reports')) {
      this.cardConfig.push({
        cardHeader: 'Export reports',
        cardTitle: 'Exporting Tools',
        cardText: 'Use this section to export raw data from the system.',
        navigation: 'export-reports',
      });
    }
    if (keyCloakService.isAllowed('lock-records')) {
      this.cardConfig.push({
        cardHeader: 'Lock/Unlock Records',
        cardTitle: 'Lock/Unlock by fiscal year',
        cardText:
          'Use this section to lock/unlock fiscal years (April-March) against editing.',
        navigation: 'lock-records',
      });
    }
    if (keyCloakService.isAllowed('review-data')) {
      this.cardConfig.push({
        cardHeader: 'Review Data',
        cardTitle: 'Review variances in data',
        cardText: 'Use this section to review variance records.',
        navigation: 'review-data',
      });
    }
  }
}
