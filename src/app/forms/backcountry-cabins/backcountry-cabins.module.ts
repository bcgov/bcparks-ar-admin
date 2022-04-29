import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCabinsComponent } from './backcountry-cabins.component';
import { BackcountryCabinsSectionModule } from './sections/backcountry-cabins-section/backcountry-cabins-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { BaseFormModule } from 'src/app/shared/components/forms/base-form/base-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { CancelButtonModule } from '../cancel-button/cancel-button.module';
import { ParkHeaderModule } from '../park-header/park-header.module';

@NgModule({
  declarations: [BackcountryCabinsComponent],
  imports: [
    CommonModule,
    BackcountryCabinsSectionModule,
    TextAreaModule,
    BaseFormModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
    CancelButtonModule,
    ParkHeaderModule,
  ],
  exports: [BackcountryCabinsComponent],
})
export class BackcountryCabinsModule {}
