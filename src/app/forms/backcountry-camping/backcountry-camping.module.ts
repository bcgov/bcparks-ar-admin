import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCampingComponent } from './backcountry-camping.component';
import { BackcountryCampingSectionModule } from './sections/backcountry-camping-section/backcountry-camping-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';

@NgModule({
  declarations: [BackcountryCampingComponent],
  imports: [CommonModule, BackcountryCampingSectionModule, TextAreaModule],
  exports: [BackcountryCampingComponent],
})
export class BackcountryCampingModule {}
