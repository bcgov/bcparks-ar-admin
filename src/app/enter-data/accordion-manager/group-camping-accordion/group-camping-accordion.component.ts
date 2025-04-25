import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { UrlService } from 'src/app/services/url.service';
import { VarianceService } from 'src/app/services/variance.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-group-camping-accordion',
    templateUrl: './group-camping-accordion.component.html',
    styleUrls: ['./group-camping-accordion.component.scss'],
    standalone: false
})
export class GroupCampingAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Group Camping';
  public variance = new BehaviorSubject(null);
  public utils = new Utils();

  constructor(
    protected dataService: DataService,
    protected formulaService: FormulaService,
    protected urlService: UrlService,
    protected varianceService: VarianceService
  ) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ACCORDION_GROUP_CAMPING)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
    let params = { ...this.urlService.getQueryParams() };
    params['activity'] = this.activity;
    this.varianceService.fetchVariance(params);
    this.subscriptions.add(
      this.dataService.watchItem(`variance-${this.activity}`).subscribe((res) => {
        if (!res?.resolved && !res?.notes){
          const fields = this.utils.formatVarianceList(res?.fields);
          if (Object.keys(fields)?.length > 0) {
            this.variance.next(fields);
          } else {
            this.variance.next(false);
          }
        } else {
          this.variance.next(false);
        }
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
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleStandard')
            },
            {
              itemName: 'Adults (16+)',
              value: this.data?.standardRateGroupsTotalPeopleAdults,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleAdults')
            },
            {
              itemName: 'Youths (6-15)',
              value: this.data?.standardRateGroupsTotalPeopleYouth,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleYouth')
            },
            {
              itemName: 'Kids (0-5)',
              value: this.data?.standardRateGroupsTotalPeopleKids,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleKids')
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
              variance: this.variance?.value?.hasOwnProperty('youthRateGroupsAttendanceGroupNights')
            },
            {
              itemName: 'People',
              value: this.data?.youthRateGroupsAttendancePeople,
              variance: this.variance?.value?.hasOwnProperty('youthRateGroupsAttendancePeople')
            },
          ],
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross standard group revenue',
              value: this.data?.legacyData?.legacy_groupCampingTotalGrossRevenue,
              variance: this.variance?.value?.hasOwnProperty('legacy_groupCampingTotalGrossRevenue')
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
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleStandard')
            },
            {
              itemName: 'Adults (16+)',
              value: this.data?.standardRateGroupsTotalPeopleAdults,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleAdults')
            },
            {
              itemName: 'Youths (6-15)',
              value: this.data?.standardRateGroupsTotalPeopleYouth,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleYouth')
            },
            {
              itemName: 'Kids (0-5)',
              value: this.data?.standardRateGroupsTotalPeopleKids,
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsTotalPeopleKids')
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
              variance: this.variance?.value?.hasOwnProperty('standardRateGroupsRevenueGross')
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
              variance: this.variance?.value?.hasOwnProperty('youthRateGroupsAttendanceGroupNights')
            },
            {
              itemName: 'People',
              value: this.data?.youthRateGroupsAttendancePeople,
              variance: this.variance?.value?.hasOwnProperty('youthRateGroupsAttendancePeople')
            },
          ],
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross youth group revenue',
              value: this.data?.youthRateGroupsRevenueGross,
              variance: this.variance?.value?.hasOwnProperty('youthRateGroupsRevenueGross')
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
