import {
  AfterViewChecked,
  Component,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { columnSchema } from '../table.component';

@Component({
  // Throws the following linting error: https://angular.io/guide/styleguide#style-05-03
  // This component is given an [attribute] selector because it augments
  // the HTML element <tr>. We do this so that the child <tr> elements of a <table>
  // can be custom components while remaining aligned with the parent <table> component.
  // eslint-disable-next-line
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements AfterViewChecked {
  @Input() columnSchema: columnSchema[];
  @Input() rowData: any;

  @ViewChildren('cellTemplateComponent', { read: ViewContainerRef })
  cellTemplateComponents: QueryList<ViewContainerRef>;

  ngAfterViewChecked(): void {
    this.loadComponents();
  }

  getComponentIdList() {
    // gather list of components in the row
    const keys = Object.keys(this.rowData);
    return keys.filter((e) => this.rowData[e].cellTemplate !== undefined);
  }

  // Load components and map them to their respective cells in the row
  loadComponents() {
    if (this.cellTemplateComponents) {
      this.cellTemplateComponents.map(
        (vcr: ViewContainerRef, index: number) => {
          vcr.clear();
          const componentIdList = this.getComponentIdList();
          const id = componentIdList.filter(
            (id) => componentIdList.indexOf(id) === index
          )[0];
          const template = this.rowData[id].cellTemplate;
          const cellTemplateComponent = vcr.createComponent<
            typeof template.component
          >(template.component);
          cellTemplateComponent.instance.data = this.rowData;
        }
      );
    }
  }
}
