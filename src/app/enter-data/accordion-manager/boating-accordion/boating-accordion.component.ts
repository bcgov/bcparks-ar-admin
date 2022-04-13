import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-boating-accordion',
  templateUrl: './boating-accordion.component.html',
  styleUrls: ['./boating-accordion.component.scss'],
})
export class BoatingAccordionComponent implements OnInit {
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
        attendanceLabel: 'Boat Attendance',
        attendanceItems: [
          {
            itemName: 'Nights on dock',
            value: undefined,
          },
          {
            itemName: 'Nights on buoys',
            value: undefined,
          },
          {
            itemName: 'Miscellaneous boats',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross boating revenue',
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
