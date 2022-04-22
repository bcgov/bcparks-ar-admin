import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayUseComponent } from './day-use.component';
import { PeopleAndVehiclesModule } from './sections/people-and-vehicles/people-and-vehicles.module';
import { PicnicSheltersModule } from './sections/picnic-shelters/picnic-shelters.module';
import { OtherDayUseModule } from './sections/other-day-use/other-day-use.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';

@NgModule({
  declarations: [DayUseComponent],
  imports: [
    CommonModule,
    PeopleAndVehiclesModule,
    PicnicSheltersModule,
    OtherDayUseModule,
    TextAreaModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
  ],
  exports: [DayUseComponent],
})
export class DayUseModule {}
