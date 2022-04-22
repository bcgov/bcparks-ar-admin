import { Component, Input } from '@angular/core';
import { FormulaService } from 'src/app/services/formula.service';

@Component({
  selector: 'app-calculation-display',
  templateUrl: './calculation-display.component.html',
  styleUrls: ['./calculation-display.component.scss'],
})
export class CalculationDisplayComponent {
  @Input() label;
  @Input() value;
  @Input() subtext;
  @Input() colorClass = 'blue';

  constructor(private formulaService: FormulaService) {}

  // need this to check if value is `0` (truthy)
  isDefined(value) {
    return this.formulaService.isValidNumber(value);
  }
}
