import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatingComponent } from './boating.component';
import { BoatingSectionModule } from './sections/boating-section/boating-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { BaseFormModule } from 'src/app/shared/components/forms/base-form/base-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { CancelButtonModule } from '../cancel-button/cancel-button.module';

@NgModule({
  declarations: [BoatingComponent],
  imports: [
    CommonModule,
    BoatingSectionModule,
    TextAreaModule,
    BaseFormModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
    CancelButtonModule,
  ],
  exports: [BoatingComponent],
})
export class BoatingModule {}
