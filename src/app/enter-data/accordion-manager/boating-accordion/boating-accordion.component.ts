import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-boating-accordion',
  templateUrl: './boating-accordion.component.html',
  styleUrls: ['./boating-accordion.component.scss'],
})
export class BoatingAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(protected dataService: DataService) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_BOATING)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        console.log(this.data);
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        attendanceLabel: 'Boat Attendance',
        attendanceItems: [
          {
            itemName: 'Nights on dock',
            value: this.data?.boatAttendanceNightsOnDock,
          },
          {
            itemName: 'Nights on buoys',
            value: this.data?.boatAttendanceNightsOnBouys,
          },
          {
            itemName: 'Miscellaneous boats',
            value: this.data?.boatAttendanceMiscellaneous,
          },
        ],
        attendanceTotal: undefined,
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross boating revenue',
            value: this.data?.boatRevenueGross,
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
