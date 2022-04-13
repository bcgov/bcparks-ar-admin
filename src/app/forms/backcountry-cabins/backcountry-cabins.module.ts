import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCabinsComponent } from './backcountry-cabins.component';
import { BackcountryCabinsSectionModule } from './sections/backcountry-cabins-section/backcountry-cabins-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';

@NgModule({
  declarations: [BackcountryCabinsComponent],
  imports: [CommonModule, BackcountryCabinsSectionModule, TextAreaModule],
  exports: [BackcountryCabinsComponent],
})
export class BackcountryCabinsModule {}
