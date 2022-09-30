import { Component, Input, OnChanges } from '@angular/core';

export interface columnSchema {
  id: string;
  displayHeader: string;
  mapValue: Function;
  cellTemplate?: Function;
  width?: string;
  columnClasses?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
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
