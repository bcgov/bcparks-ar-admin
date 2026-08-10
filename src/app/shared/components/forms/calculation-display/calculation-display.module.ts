import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationDisplayComponent } from './calculation-display.component';

@NgModule({
    imports: [CommonModule, CalculationDisplayComponent],
    exports: [CalculationDisplayComponent],
})
export class CalculationDisplayModule {}
