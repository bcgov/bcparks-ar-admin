import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableRowComponent } from './table-row/table-row.component';

@NgModule({
  declarations: [TableComponent, TableRowComponent],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
