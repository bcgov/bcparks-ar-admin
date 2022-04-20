import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicnicSheltersComponent } from './picnic-shelters.component';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PicnicSheltersComponent],
  imports: [
    CommonModule,
    TextInputModule,
    CalculationDisplayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PicnicSheltersComponent],
})
export class PicnicSheltersModule {}
