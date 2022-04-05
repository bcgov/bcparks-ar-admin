import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculation-display',
  templateUrl: './calculation-display.component.html',
  styleUrls: ['./calculation-display.component.scss'],
})
export class CalculationDisplayComponent {
  @Input() label = '1';
  @Input() value = '2';
  @Input() subtext = '3';

  constructor() {}
}
