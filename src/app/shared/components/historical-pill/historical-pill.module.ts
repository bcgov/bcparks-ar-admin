import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalPillComponent } from './historical-pill.component';

@NgModule({
    imports: [CommonModule, HistoricalPillComponent],
    exports: [HistoricalPillComponent],
})
export class HistoricalPillModule {}
