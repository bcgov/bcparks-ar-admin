import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCampingComponent } from './group-camping.component';
import { StandardRateGroupsModule } from './sections/standard-rate-groups/standard-rate-groups.module';
import { YouthRateGroupsModule } from './sections/youth-rate-groups/youth-rate-groups.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { CancelButtonModule } from '../cancel-button/cancel-button.module';
import { ParkHeaderModule } from '../park-header/park-header.module';

@NgModule({
  declarations: [GroupCampingComponent],
  imports: [
    CommonModule,
    StandardRateGroupsModule,
    YouthRateGroupsModule,
    TextAreaModule,
    FormsModule,
    ReactiveFormsModule,
    TextToLoadingSpinnerModule,
    CancelButtonModule,
    ParkHeaderModule,
  ],
  exports: [GroupCampingComponent],
})
export class GroupCampingModule {}
