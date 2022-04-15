import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-frontcountry-camping-accordion',
  templateUrl: './frontcountry-camping-accordion.component.html',
  styleUrls: ['./frontcountry-camping-accordion.component.scss'],
})
export class FrontcountryCampingAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(protected dataService: DataService) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        title: 'Camping Party Nights',
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: this.data?.campingPartyNightsAttendanceStandard,
          },
          {
            itemName: 'Senior',
            value: this.data?.campingPartyNightsAttendanceSenior,
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.campingPartyNightsAttendanceSocial,
          },
          {
            itemName: 'Long stay',
            value: this.data?.campingPartyNightsAttendanceLongStay,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross camping revenue',
            value: this.data?.campingPartyNightsRevenueGross,
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
            value: this.data?.secondCarsAttendanceStandard,
          },
          {
            itemName: 'Senior',
            value: this.data?.secondCarsAttendanceSenior,
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.secondCarsAttendanceSocial,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross 2nd car revenue',
            value: this.data?.secondCarsAttendanceSocial,
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
            value: this.data?.otherRevenueGrossSani,
          },
          {
            itemName: 'Gross electrical fee revenue',
            value: this.data?.otherRevenueElectrical,
          },
          {
            itemName: 'Gross shower revenue',
            value: this.data?.otherRevenueShower,
          },
        ],
        revenueTotal: undefined,
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
