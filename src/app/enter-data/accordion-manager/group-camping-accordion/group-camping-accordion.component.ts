import { Component, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-group-camping-accordion',
  templateUrl: './group-camping-accordion.component.html',
  styleUrls: ['./group-camping-accordion.component.scss'],
})
export class GroupCampingAccordionComponent implements OnInit {
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
        title: 'Standard rate groups',
        attendanceLabel: 'Total People',
        attendanceItems: [
          {
            itemName: 'Standard group nights',
            value: undefined,
          },
          {
            itemName: 'Adults (16+)',
            value: undefined,
          },
          {
            itemName: 'Youth (6-15)',
            value: undefined,
          },
          {
            itemName: 'Kids (0-5)',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross standard group revenue',
            value: undefined,
          },
        ],
        revenueTotal: undefined,
      },
      {
        title: 'Youth rate groups',
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Group nights',
            value: undefined,
          },
          {
            itemName: 'People',
            value: undefined,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross youth group revenue',
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
