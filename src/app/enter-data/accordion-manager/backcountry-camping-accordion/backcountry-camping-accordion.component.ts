import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-backcountry-camping-accordion',
  templateUrl: './backcountry-camping-accordion.component.html',
  styleUrls: ['./backcountry-camping-accordion.component.scss'],
})
export class BackcountryCampingAccordionComponent implements OnInit {
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
        attendanceItems: [
          {
            itemName: 'People',
            value: undefined,
          },
        ],
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross camping revenue',
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
