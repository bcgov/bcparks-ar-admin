import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontcountryCabinsComponent } from './frontcountry-cabins.component';
import { FrontcountryCabinsSectionModule } from './sections/frontcountry-cabins-section/frontcountry-cabins-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { CancelButtonModule } from '../cancel-button/cancel-button.module';
import { ParkHeaderModule } from '../park-header/park-header.module';

@NgModule({
  declarations: [FrontcountryCabinsComponent],
  imports: [
    CommonModule,
    FrontcountryCabinsSectionModule,
    TextAreaModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
    CancelButtonModule,
    ParkHeaderModule,
  ],
  exports: [FrontcountryCabinsComponent],
})
export class FrontcountryCabinsModule {}
