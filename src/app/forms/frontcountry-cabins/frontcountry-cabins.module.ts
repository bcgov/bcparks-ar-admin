import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontcountryCabinsComponent } from './frontcountry-cabins.component';
import { FrontcountryCabinsSectionModule } from './sections/frontcountry-cabins-section/frontcountry-cabins-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';

@NgModule({
  declarations: [FrontcountryCabinsComponent],
  imports: [CommonModule, FrontcountryCabinsSectionModule, TextAreaModule],
  exports: [FrontcountryCabinsComponent],
})
export class FrontcountryCabinsModule {}
