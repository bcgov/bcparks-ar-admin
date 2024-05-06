import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VarianceSearchComponent } from './variance-search.component';
import { VarianceFiltersComponent } from './variance-filters/variance-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VarianceListComponent } from './variance-list/variance-list.component';
import { VarianceAccordionComponent } from './variance-list/variance-accordion/variance-accordion.component';
import { NgdsFormsModule } from '@digitalspace/ngds-forms'
import { HistoricalPillModule } from "../shared/components/historical-pill/historical-pill.module";

@NgModule({
    declarations: [
        VarianceSearchComponent,
        VarianceFiltersComponent,
        VarianceListComponent,
        VarianceAccordionComponent,
    ],
    exports: [
        VarianceSearchComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgdsFormsModule,
        HistoricalPillModule
    ]
})
export class VarianceSearchModule { }
