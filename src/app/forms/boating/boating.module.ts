import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatingComponent } from './boating.component';
import { BoatingSectionModule } from './sections/boating-section/boating-section.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';

@NgModule({
  declarations: [BoatingComponent],
  imports: [CommonModule, BoatingSectionModule, TextAreaModule],
  exports: [BoatingComponent],
})
export class BoatingModule {}
