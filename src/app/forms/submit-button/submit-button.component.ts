import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent {
  @Input() disabled = false;
  @Output() clicked = new EventEmitter;
}
