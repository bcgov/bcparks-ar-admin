import { Component, Input } from '@angular/core';
import { summarySection, SummarySectionComponent } from '../summary-section/summary-section.component';

@Component({
    selector: 'app-accordion-summaries',
    templateUrl: './accordion-summaries.component.html',
    styleUrls: ['./accordion-summaries.component.scss'],
    imports: [SummarySectionComponent]
})
export class AccordionSummariesComponent {
  @Input() summaries: summarySection[] = [];
}
