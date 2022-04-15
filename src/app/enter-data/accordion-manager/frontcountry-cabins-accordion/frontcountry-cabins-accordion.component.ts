import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-frontcountry-cabins-accordion',
  templateUrl: './frontcountry-cabins-accordion.component.html',
  styleUrls: ['./frontcountry-cabins-accordion.component.scss'],
})
export class FrontcountryCabinsAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(protected dataService: DataService) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Parties',
            value: this.data?.totalAttendanceParties,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross camping revenue',
            value: this.data?.revenueGrossCamping,
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
