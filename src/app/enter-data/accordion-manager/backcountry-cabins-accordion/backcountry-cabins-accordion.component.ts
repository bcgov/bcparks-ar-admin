import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-backcountry-cabins-accordion',
  templateUrl: './backcountry-cabins-accordion.component.html',
  styleUrls: ['./backcountry-cabins-accordion.component.scss'],
})
export class BackcountryCabinsAccordionComponent implements OnInit {
  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor() {}

  ngOnInit(): void {
    this.buildAccordion();
  }

  buildAccordion() {
    this.data = this.getData();
    this.summaries = [
      {
        attendanceLabel: 'Total People',
        attendanceItems: [
          {
            itemName: 'Adult (16+)',
            value: undefined,
          },
          {
            itemName: 'Child (6-15)',
            value: undefined,
          },
          {
            itemName: 'Family',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Family',
            value: undefined,
          },
        ],
        revenueTotal: undefined,
      },
    ];
  }

  getData() {
    return;
  }
}
