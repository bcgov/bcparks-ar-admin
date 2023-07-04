import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VarianceSearchComponent } from './variance-search.component';
import { VarianceFiltersComponent } from './variance-filters/variance-filters.component';
import { TypeaheadModule } from '../shared/components/typeahead/typeahead.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PicklistModule } from '../shared/components/forms/picklist/picklist.module';
import { VarianceListComponent } from './variance-list/variance-list.component';
import { VarianceAccordionComponent } from './variance-list/variance-accordion/variance-accordion.component';

@NgModule({
  declarations: [
    VarianceSearchComponent,
    VarianceFiltersComponent,
    VarianceListComponent,
    VarianceAccordionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
    CommonModule,
    BsDatepickerModule,
    PicklistModule
  ],
  exports: [
    VarianceSearchComponent
  ]
})
export class VarianceSearchModule { }
