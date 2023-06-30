import { Component, Input, TemplateRef } from '@angular/core';


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

}
