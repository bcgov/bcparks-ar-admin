import { Component } from '@angular/core';
import { SubareaFormComponent } from '../subarea-form/subarea-form.component';

@Component({
    selector: 'app-add-subarea',
    templateUrl: './add-subarea.component.html',
    styleUrls: ['./add-subarea.component.scss'],
    imports: [SubareaFormComponent]
})
export class AddSubareaComponent {
  constructor() { }

}
