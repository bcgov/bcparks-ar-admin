import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-frontcountry-cabins-accordion',
  templateUrl: './frontcountry-cabins-accordion.component.html',
  styleUrls: ['./frontcountry-cabins-accordion.component.scss'],
})
export class FrontcountryCabinsAccordionComponent implements OnInit {
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
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Parties',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
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
