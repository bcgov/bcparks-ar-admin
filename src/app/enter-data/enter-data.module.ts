import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterDataComponent } from './enter-data.component';
import { TypeaheadModule } from '../shared/components/typeahead/typeahead.module';
import { InfoTextModule } from '../shared/components/info-text/info-text.module';
import { SelectModule } from '../shared/components/select/select.module';

@NgModule({
  declarations: [EnterDataComponent],
  imports: [CommonModule, TypeaheadModule, InfoTextModule, SelectModule],
  exports: [EnterDataComponent],
})
export class EnterDataModule {}
