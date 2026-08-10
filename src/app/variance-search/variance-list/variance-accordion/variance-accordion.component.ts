import { Component, Input, TemplateRef, inject } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LoadingService } from 'src/app/services/loading.service';
import { VarianceService } from 'src/app/services/variance.service';
import { NgClass, NgTemplateOutlet } from '@angular/common';


@Component({
    selector: 'app-variance-accordion',
    templateUrl: './variance-accordion.component.html',
    styleUrls: ['./variance-accordion.component.scss'],
    imports: [NgClass, NgTemplateOutlet]
})
export class VarianceAccordionComponent {
  private varianceService = inject(VarianceService);
  protected loadingService = inject(LoadingService);
  private keycloakService = inject(KeycloakService);

  @Input() rowSchema: any[] = [];
  @Input() dropDownSchema: any[] = [];
  @Input() resolvedStatusTemplate: TemplateRef<any>;
  @Input() rowData: any;
  @Input() isHeader: boolean = false;

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
