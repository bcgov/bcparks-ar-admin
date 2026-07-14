import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-non-resident-revenue',
  templateUrl: './non-resident-revenue.component.html',
  standalone: false,
})
export class NonResidentRevenueComponent {
  @Input() control: UntypedFormControl;
  @Input() total: formulaResult = { result: null, formula: '' };
  @Input() invalidConfig: any;
  @Input() loading: boolean = false;
  @Input() popoverData: any = null;
  @Input() popoverTemplate: any = null;
}

