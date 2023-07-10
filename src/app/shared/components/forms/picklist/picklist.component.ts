import { Component, Input } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.scss']
})
export class PicklistComponent {
  @Input() control = new UntypedFormControl;
  @Input() label;
  @Input() icon;
  @Input() id;
  @Input() set disabled(value: boolean) {
    this.setDisabled(value)
  }
  public get disabled() { 
    return this._disabled.value;
  }
  @Input() set options(value: any) {
    this._options.next(value);
  }
  public get options() {
    return this._options.value || [];
  }
  @Input() placeholder = '';
  @Input() required = false;

  public _options = new BehaviorSubject<any>({ value: null, display: null });
  public _disabled = new BehaviorSubject<any>(false);

  isRequired(): boolean {
    return this.control.hasValidator(Validators.required)
  }

  setDisabled(value: boolean) {
    this._disabled.next(value);
    if (value) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
