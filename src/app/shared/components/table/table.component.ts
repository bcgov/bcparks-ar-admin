import { Component, Input, OnChanges } from '@angular/core';

export interface columnSchema {
  id: string; // unique column identifier
  displayHeader: string; // column header title
  mapValue: Function; // function that returns the value of the cell
  mapDisplay?: Function; // function that returns what to display in the cell, if different from the value.
  cellTemplate?: Function; // function that returns a component to fill the cell
  width?: string; // relative column width (0-100%)
  columnClasses?: string; // injectable column classes
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent implements OnChanges {
  @Input() columnSchema: columnSchema[];
  @Input() data: any[];
  @Input() emptyTableMsg = 'This table is empty.';

  public columns;
  public rows: any = [];

  constructor() {}

  ngOnChanges() {
    this.parseData();
  }

  async parseData() {
    this.columns = [];
    this.rows = [];
    this.columns = this.columnSchema.map((id) => id.displayHeader);
    if (this.data && this.data.length > 0) {
      for (const item of this.data) {
        let row: any = {};
        this.columnSchema.map(async (col) => {
          // we pass the whole row to column functions
          row[col.id] = {
            value: col.mapValue(item),
          };
          if (col.mapDisplay) {
            row[col.id].display = col.mapDisplay(item);
          }
          if (col.cellTemplate) {
            row[col.id].cellTemplate = col.cellTemplate(item);
          }
          row['raw'] = item;
        });
        this.rows.push(row);
      }
    }
  }
}
