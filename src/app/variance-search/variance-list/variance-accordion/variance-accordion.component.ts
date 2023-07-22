import { Component, Input, TemplateRef } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LoadingService } from 'src/app/services/loading.service';
import { VarianceService } from 'src/app/services/variance.service';


@Component({
  selector: 'app-variance-accordion',
  templateUrl: './variance-accordion.component.html',
  styleUrls: ['./variance-accordion.component.scss']
})
export class VarianceAccordionComponent {
  @Input() rowSchema: any[] = [];
  @Input() dropDownSchema: any[] = [];
  @Input() resolvedStatusTemplate: TemplateRef<any>;
  @Input() rowData: any;
  @Input() isHeader: boolean = false;

  constructor(
    private varianceService: VarianceService,
    protected loadingService: LoadingService,
    private keycloakService: KeycloakService
  ) { }

  isAdmin() {
    return this.keycloakService.isAdmin();
  }

  resolveVariance(resolve = true) {
    this.varianceService.resolveVariance(
      this.rowData.orcs,
      this.rowData.date,
      this.rowData.subAreaId,
      this.rowData.activity,
      resolve
    );
  }

}
