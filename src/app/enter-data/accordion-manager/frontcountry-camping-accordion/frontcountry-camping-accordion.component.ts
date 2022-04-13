import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-frontcountry-camping-accordion',
  templateUrl: './frontcountry-camping-accordion.component.html',
  styleUrls: ['./frontcountry-camping-accordion.component.scss'],
})
export class FrontcountryCampingAccordionComponent implements OnInit {
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
        title: 'Camping Party Nights',
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: undefined,
          },
          {
            itemName: 'Senior',
            value: undefined,
          },
          {
            itemName: 'Social services fee exemption',
            value: undefined,
          },
          {
            itemName: 'Long stay',
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
      {
        title: 'Second cars / additional vehicles',
        attendanceLabel: 'Total attendance',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: undefined,
          },
          {
            itemName: 'Senior',
            value: undefined,
          },
          {
            itemName: 'Social services fee exemption',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross 2nd car revenue',
            value: undefined,
          },
        ],
        revenueTotal: undefined,
      },
      {
        title: 'Other frontcountry camping revenue',
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross sani revenue',
            value: undefined,
          },
          {
            itemName: 'Gross electrical fee revenue',
            value: undefined,
          },
          {
            itemName: 'Gross shower revenue',
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
