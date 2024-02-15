import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCabinsComponent } from './backcountry-cabins/backcountry-cabins.component';
import { ParkHeaderModule } from './park-header/park-header.module';
import { NgdsFormsModule } from '@digitalspace/ngds-forms'
import { CancelButtonModule } from './cancel-button/cancel-button.module';
import { CalculationDisplayModule } from '../shared/components/forms/calculation-display/calculation-display.module';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { TextToLoadingSpinnerModule } from '../shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { BackcountryCampingComponent } from './backcountry-camping/backcountry-camping.component';
import { DayUseComponent } from './day-use/day-use.component';
import { BoatingComponent } from './boating/boating.component';
import { GroupCampingComponent } from './group-camping/group-camping.component';
import { FrontcountryCabinsComponent } from './frontcountry-cabins/frontcountry-cabins.component';
import { FrontcountryCampingComponent } from './frontcountry-camping/frontcountry-camping.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VarianceWarningModalComponent } from './variance-warning-modal/variance-warning-modal.component';
import { InfoTextModule } from '../shared/components/info-text/info-text.module';

@NgModule({
  declarations: [
    BackcountryCabinsComponent,
    BackcountryCampingComponent,
    BoatingComponent,
    DayUseComponent,
    GroupCampingComponent,
    FrontcountryCabinsComponent,
    FrontcountryCampingComponent,
    VarianceWarningModalComponent,
    SubmitButtonComponent],
  imports: [
    CommonModule,
    ParkHeaderModule,
    NgdsFormsModule,
    CancelButtonModule,
    CalculationDisplayModule,
    TextToLoadingSpinnerModule,
    InfoTextModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    BackcountryCabinsComponent,
    SubmitButtonComponent,
    VarianceWarningModalComponent,
  ]
})
export class ActivityFormsModule { }
