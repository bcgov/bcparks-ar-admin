import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterDataComponent } from './enter-data.component';
import { CenteredTextBlockModule } from '../shared/components/centered-text-block/centered-text-block.module';
import { AccordionManagerModule } from './accordion-manager/accordion-manager.module';
import { FormService } from '../services/form.service';
import { SubAreaSearchModule } from './sub-area-search/sub-area-search.module';
import { RouterModule } from '@angular/router';
import { ActivityFormsModule } from '../forms/activity-forms.module';

@NgModule({
  declarations: [
    EnterDataComponent,
  ],
  imports: [
    AccordionManagerModule,
    SubAreaSearchModule,
    CenteredTextBlockModule,
    ActivityFormsModule,
    RouterModule,
    CommonModule,
  ],
  exports: [EnterDataComponent],
  providers: [FormService, FormService],
})
export class EnterDataModule {}
