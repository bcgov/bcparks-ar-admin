import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-group-camping-accordion',
  templateUrl: './group-camping-accordion.component.html',
  styleUrls: ['./group-camping-accordion.component.scss'],
})
export class GroupCampingAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(
    protected dataService: DataService,
    protected formulaService: FormulaService
  ) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_GROUP_CAMPING)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        title: 'Standard rate groups',
        attendanceLabel: 'Total People',
        attendanceItems: [
          {
            itemName: 'Standard group nights',
            value: this.data?.standardRateGroupsTotalPeopleStandard,
          },
          {
            itemName: 'Adults (16+)',
            value: this.data?.standardRateGroupsTotalPeopleAdults,
          },
          {
            itemName: 'Youth (6-15)',
            value: this.data?.standardRateGroupsTotalPeopleYouth,
          },
          {
            itemName: 'Kids (0-5)',
            value: this.data?.standardRateGroupsTotalPeopleKids,
          },
        ],
        attendanceTotal: this.formulaService.groupCampingStandardAttendance([
          this.data?.standardRateGroupsTotalPeopleStandard,
          this.data?.standardRateGroupsTotalPeopleAdults,
          this.data?.standardRateGroupsTotalPeopleYouth,
          this.data?.standardRateGroupsTotalPeopleKids,
        ]),
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross standard group revenue',
            value: this.data?.standardRateGroupsRevenueGross,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.standardRateGroupsRevenueGross,
        ]),
      },
      {
        title: 'Youth rate groups',
        attendanceLabel: 'Total Attendance',
        attendanceItems: [
          {
            itemName: 'Group nights',
            value: this.data?.youthRateGroupsAttendanceGroupNights,
          },
          {
            itemName: 'People',
            value: this.data?.youthRateGroupsAttendancePeople,
          },
        ],
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross youth group revenue',
            value: this.data?.youthRateGroupsRevenueGross,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.youthRateGroupsRevenueGross,
        ]),
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
