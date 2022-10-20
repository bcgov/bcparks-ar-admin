import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    declarations: [DatePickerComponent],
    imports: [NgbModule, FormsModule, CommonModule],
    exports: [DatePickerComponent],
    providers: []
})
export class DatePickerModule {}
