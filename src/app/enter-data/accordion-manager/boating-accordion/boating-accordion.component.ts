import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
        .watchItem(Constants.dataIds.ACCORDION_BOATING)
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
        attendanceTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyAttendance(this.data?.legacyData?.legacy_boatingTotalAttendancePeople) :
          this.formulaService.boatingAttendance(
            [
              this.data?.boatAttendanceNightsOnDock,
              this.data?.boatAttendanceNightsOnBouys,
              this.data?.boatAttendanceMiscellaneous,
            ],
            this.data?.config?.attendanceModifier
          ),
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross boating revenue',
            value: this.data?.boatRevenueGross,
          },
        ],
        revenueTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_boatingTotalNetRevenue) :
          this.formulaService.basicNetRevenue([
            this.data?.boatRevenueGross,
          ]),
      },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
