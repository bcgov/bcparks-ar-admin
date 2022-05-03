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
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
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
        revenueLabel: 'Net Revenue',
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
