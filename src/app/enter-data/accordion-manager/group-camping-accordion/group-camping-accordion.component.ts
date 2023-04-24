import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
        .watchItem(Constants.dataIds.ACCORDION_GROUP_CAMPING)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
  }

  buildAccordion() {
    // legacy and non-legacy layouts are vastly different
    if (this.data?.isLegacy) {
      this.summaries = [
        {
          isLegacy: true,
          title: 'Standard rate groups',
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
              itemName: 'Youths (6-15)',
              value: this.data?.standardRateGroupsTotalPeopleYouth,
            },
            {
              itemName: 'Kids (0-5)',
              value: this.data?.standardRateGroupsTotalPeopleKids,
            },
          ],
        },
        {
          isLegacy: true,
          title: 'Youth rate groups',
          attendanceLabel: 'Total people',
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
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross standard group revenue',
              value: this.data?.legacyData?.legacy_groupCampingTotalGrossRevenue
            },
          ],
          revenueTotal: this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_groupCampingTotalNetRevenue),
        }
      ];
    } else {
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
              itemName: 'Youths (6-15)',
              value: this.data?.standardRateGroupsTotalPeopleYouth,
            },
            {
              itemName: 'Kids (0-5)',
              value: this.data?.standardRateGroupsTotalPeopleKids,
            },
          ],
          attendanceTotal: this.formulaService.groupCampingStandardAttendance([
            this.data?.standardRateGroupsTotalPeopleAdults,
            this.data?.standardRateGroupsTotalPeopleYouth,
            this.data?.standardRateGroupsTotalPeopleKids,
          ]),
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross standard group revenue',
              value: this.data?.isLegacy ?
                this.data?.legacyData?.legacy_groupCampingTotalGrossRevenue :
                this.data?.standardRateGroupsRevenueGross,
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.standardRateGroupsRevenueGross,
          ]),
        },
        {
          title: 'Youth rate groups',
          attendanceLabel: 'Total attendance',
          attendanceItems: [
            {
              itemName: 'Youth group nights',
              value: this.data?.youthRateGroupsAttendanceGroupNights,
            },
            {
              itemName: 'People',
              value: this.data?.youthRateGroupsAttendancePeople,
            },
          ],
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross youth group revenue',
              value: this.data?.youthRateGroupsRevenueGross,
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.youthRateGroupsRevenueGross,
          ]),
        }
      ];
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
