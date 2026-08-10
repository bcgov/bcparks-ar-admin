import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { NgdsForms } from '@digitalspace/ngds-forms';
import { InfoTextComponent } from '../info-text/info-text.component';
import { CalculationDisplayComponent } from '../forms/calculation-display/calculation-display.component';

@Component({
    selector: 'app-non-resident-revenue',
    templateUrl: './non-resident-revenue.component.html',
    styleUrls: ['./non-resident-revenue.component.scss'],
    imports: [
        PopoverDirective,
        NgdsForms,
        InfoTextComponent,
        CalculationDisplayComponent,
    ],
})
export class NonResidentRevenueComponent {
  @Input() control: UntypedFormControl;
  @Input() total: formulaResult = { result: null, formula: '' };
  @Input() invalidConfig: any;
  @Input() loading: boolean = false;
  @Input() popoverData: any = null;
  @Input() popoverTemplate: any = null;
}

