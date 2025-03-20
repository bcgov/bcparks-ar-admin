import { Component, Input } from '@angular/core';
import { summarySection } from '../summary-section/summary-section.component';

@Component({
    selector: 'app-accordion-summaries',
    templateUrl: './accordion-summaries.component.html',
    styleUrls: ['./accordion-summaries.component.scss'],
    standalone: false
})
export class AccordionSummariesComponent {
  @Input() summaries: summarySection[] = [];
}
