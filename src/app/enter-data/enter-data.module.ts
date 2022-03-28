import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterDataComponent } from './enter-data.component';
import { TypeaheadModule } from '../shared/components/typeahead/typeahead.module';
import { InfoTextModule } from '../shared/components/info-text/info-text.module';
import { SelectModule } from '../shared/components/select/select.module';
import { DatePickerModule } from '../shared/components/date-picker/date-picker.module';

@NgModule({
  declarations: [EnterDataComponent],
  imports: [
    CommonModule,
    TypeaheadModule,
    InfoTextModule,
    SelectModule,
    DatePickerModule,
  ],
  exports: [EnterDataComponent],
})
export class EnterDataModule {}
