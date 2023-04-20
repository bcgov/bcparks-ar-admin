import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-notes',
  templateUrl: './accordion-notes.component.html',
  styleUrls: ['./accordion-notes.component.scss']
})
export class AccordionNotesComponent {
  @Input() notes: string = '';
  @Input() label: string = 'Variance notes';
}
