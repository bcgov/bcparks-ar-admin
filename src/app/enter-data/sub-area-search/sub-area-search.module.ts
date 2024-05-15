import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAreaSearchComponent } from './sub-area-search.component';
import { TextToLoadingSpinnerModule } from 'src/app/shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgdsFormsModule } from '@digitalspace/ngds-forms'
import { HistoricalPillModule } from "../../shared/components/historical-pill/historical-pill.module";

@NgModule({
    declarations: [SubAreaSearchComponent],
    exports: [SubAreaSearchComponent],
    imports: [
        CommonModule,
        NgbModule,
        TextToLoadingSpinnerModule,
        NgdsFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HistoricalPillModule
    ]
})
export class SubAreaSearchModule { }
