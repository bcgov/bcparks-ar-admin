import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCampingComponent } from './group-camping.component';
import { StandardRateGroupsModule } from './sections/standard-rate-groups/standard-rate-groups.module';
import { YouthRateGroupsModule } from './sections/youth-rate-groups/youth-rate-groups.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GroupCampingComponent],
  imports: [
    CommonModule,
    StandardRateGroupsModule,
    YouthRateGroupsModule,
    TextAreaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GroupCampingComponent],
})
export class GroupCampingModule {}
