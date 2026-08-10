import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextToLoadingSpinnerComponent } from '../../shared/components/text-to-loading-spinner/text-to-loading-spinner.component';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
    imports: [TextToLoadingSpinnerComponent]
})
export class SubmitButtonComponent {
  @Input() disabled = false;
  @Output() clicked = new EventEmitter;
}
