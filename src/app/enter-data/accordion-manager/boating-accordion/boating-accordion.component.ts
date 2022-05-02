import { Component, OnDestroy } from '@angular/core';
import { Subscription, takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-boating-accordion',
  templateUrl: './boating-accordion.component.html',
  styleUrls: ['./boating-accordion.component.scss'],
})
export class BoatingAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(
    protected dataService: DataService,
    protected formulaService: FormulaService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ACCORDION_BOATING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
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
        attendanceTotal: this.formulaService.boatingAttendance(
          [
            this.data?.boatAttendanceNightsOnDock,
            this.data?.boatAttendanceNightsOnBouys,
            this.data?.boatAttendanceMiscellaneous,
          ],
          this.data?.config?.attendanceModifier
        ),
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross boating revenue',
            value: this.data?.boatRevenueGross,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.boatRevenueGross,
        ]),
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
    this.subscriptions.unsubscribe();
  }
}
