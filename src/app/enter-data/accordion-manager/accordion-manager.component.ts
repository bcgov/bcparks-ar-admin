import { Component, Input, OnInit } from '@angular/core';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-accordion-manager',
  templateUrl: './accordion-manager.component.html',
  styleUrls: ['./accordion-manager.component.scss']
})
export class AccordionManagerComponent implements OnInit {
  @Input() data: any;

  public icons = Constants.iconUrls;

  // dummy data for now
  public frontCountryData: summarySection[] = [
    {
      title: 'Camping Party Nights',
      attendanceLabel: 'Total attendance',
      attendanceItems: [
        {
          itemName: 'Standard',
          value: 125
        },
        {
          itemName: 'Senior',
          value: 56
        },
        {
          itemName: 'Social services fee exemption',
          value: 20
        },
        {
          itemName: 'Long stay',
          value: 44
        }
      ],
      revenueLabel: 'Net revenue',
      revenueItems: [
        {
          itemName: 'Gross camping revenue',
          value: 46843.48
        }
      ]
    },
    {
      title: 'Second cars / additional vehicles',
      attendanceLabel: 'Total Attendance',
      attendanceItems: [
        {
          itemName: 'Standard',
          value: 125
        },
        {
          itemName: 'Senior',
        },
        {
          itemName: 'Social services fee exemption',
          value: 20
        },
      ],
      revenueLabel: 'Net revenue',
      revenueItems: [
        {
          itemName: 'Gross 2nd car revenue',
          value: 46843.48
        }
      ]
    },
    {
      title: 'Other frontcountry camping revenue',
      revenueLabel: 'Net revenue',
      revenueItems: [
        {
          itemName: 'Gross sani revenue',
          value: 51348.54
        },
        {
          itemName: 'Gross electrical fee revenue',
        },
        {
          itemName: 'Gross shower revenue',
          value: 1534.54
        }
      ]
    }
  ];

  public frontCountryCabinsData: summarySection[] = [
    {
      revenueLabel: 'Net revenue',
      revenueItems: [
        {
          itemName: 'Parties',
        },
        {
          itemName: 'Gross camping revenue',
          value: 18643.15
        }
      ]
    }
  ];

  public mockVarianceNotes = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  constructor() { }

  ngOnInit(): void {
  }

}
