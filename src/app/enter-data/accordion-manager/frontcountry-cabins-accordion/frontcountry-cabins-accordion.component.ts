import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-frontcountry-cabins-accordion',
  templateUrl: './frontcountry-cabins-accordion.component.html',
  styleUrls: ['./frontcountry-cabins-accordion.component.scss'],
})
export class FrontcountryCabinsAccordionComponent implements OnDestroy {
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
        .watchItem(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
  }

  buildAccordion() {
    if (this.data?.isLegacy) {
      this.summaries = [
        {
          isLegacy: true,
          attendanceItems: [
            {
              itemName: 'Parties',
              value: this.data?.totalAttendanceParties,
            },
          ],
          revenueItems: [
            {
              itemName: 'Gross camping revenue',
              value: this.data?.revenueGrossCamping,
            },
          ],
        },
      ];

    } else {
      this.summaries = [
        {
          attendanceLabel: 'Total attendance',
          attendanceItems: [
            {
              itemName: 'Parties',
              value: this.data?.totalAttendanceParties,
            },
          ],
          attendanceTotal: this.formulaService.frontcountryCabinsAttendance(
            [this.data?.totalAttendanceParties],
            this.data?.config?.attendanceModifier
          ),
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross camping revenue',
              value: this.data?.revenueGrossCamping,
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.revenueGrossCamping,
          ]),
        },
      ];
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
