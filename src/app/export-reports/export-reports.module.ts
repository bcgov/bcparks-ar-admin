import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportReportsComponent } from './export-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgdsTabsModule } from '@digitalspace/ngds-toolkit';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgdsFormsModule } from '@digitalspace/ngds-forms';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        NgdsTabsModule,
        NgdsFormsModule,
        BsDatepickerModule,
        FormsModule,
        ExportReportsComponent,
    ],
    exports: [ExportReportsComponent],
})
export class ExportReportsModule {}
