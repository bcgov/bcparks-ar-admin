import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterDataComponent } from './enter-data.component';
import { TypeaheadModule } from '../shared/components/typeahead/typeahead.module';
import { InfoTextModule } from '../shared/components/info-text/info-text.module';
import { SelectModule } from '../shared/components/select/select.module';
import { DatePickerModule } from '../shared/components/date-picker/date-picker.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SubAreaSearchComponent } from './sub-area-search/sub-area-search.component';
import { CenteredTextBlockModule } from '../shared/components/centered-text-block/centered-text-block.module';
import { AccordionManagerModule } from './accordion-manager/accordion-manager.module';
import { DayUseModule } from '../forms/day-use/day-use.module';

@NgModule({
  declarations: [
    EnterDataComponent,
    SubAreaSearchComponent,
  ],
  imports: [
    CommonModule,
    TypeaheadModule,
    InfoTextModule,
    SelectModule,
    DatePickerModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    CenteredTextBlockModule,
    AccordionManagerModule,
    DayUseModule,
  ],
  exports: [EnterDataComponent],
})
export class EnterDataModule {}
