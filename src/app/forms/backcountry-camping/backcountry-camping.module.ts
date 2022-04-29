import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCampingComponent } from './backcountry-camping.component';
import { BackcountryCampingSectionModule } from './sections/backcountry-camping-section/backcountry-camping-section.module';
import { BaseFormModule } from 'src/app/shared/components/forms/base-form/base-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { CancelButtonModule } from '../cancel-button/cancel-button.module';
import { ParkHeaderModule } from '../park-header/park-header.module';

@NgModule({
  declarations: [BackcountryCampingComponent],
  imports: [
    CommonModule,
    BackcountryCampingSectionModule,
    TextAreaModule,
    BaseFormModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
    CancelButtonModule,
    ParkHeaderModule,
  ],
  exports: [BackcountryCampingComponent],
})
export class BackcountryCampingModule {}
