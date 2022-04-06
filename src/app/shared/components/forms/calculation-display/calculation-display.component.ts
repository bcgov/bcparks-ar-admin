import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculation-display',
  templateUrl: './calculation-display.component.html',
  styleUrls: ['./calculation-display.component.scss'],
})
export class CalculationDisplayComponent {
  @Input() label;
  @Input() value;
  @Input() subtext;

  constructor() {}
}
