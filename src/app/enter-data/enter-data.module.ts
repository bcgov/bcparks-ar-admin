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
import { BackcountryCabinsModule } from '../forms/backcountry-cabins/backcountry-cabins.module';
import { RouterModule } from '@angular/router';
import { BackcountryCampingModule } from '../forms/backcountry-camping/backcountry-camping.module';
import { BoatingModule } from '../forms/boating/boating.module';
import { FrontcountryCabinsModule } from '../forms/frontcountry-cabins/frontcountry-cabins.module';
import { FrontcountryCampingModule } from '../forms/frontcountry-camping/frontcountry-camping.module';
import { GroupCampingModule } from '../forms/group-camping/group-camping.module';
import { FormService } from '../services/form.service';
import { TextToLoadingSpinnerModule } from '../shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EnterDataComponent, SubAreaSearchComponent],
  imports: [
    NgbModule,
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
    RouterModule,
    BackcountryCabinsModule,
    BackcountryCampingModule,
    BoatingModule,
    DayUseModule,
    FrontcountryCabinsModule,
    FrontcountryCampingModule,
    GroupCampingModule,
    TextToLoadingSpinnerModule,
  ],
  exports: [EnterDataComponent],
  providers: [FormService, FormService],
})
export class EnterDataModule {}
