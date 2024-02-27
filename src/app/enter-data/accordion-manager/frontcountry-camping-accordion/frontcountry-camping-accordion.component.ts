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
  selector: 'app-frontcountry-camping-accordion',
  templateUrl: './frontcountry-camping-accordion.component.html',
  styleUrls: ['./frontcountry-camping-accordion.component.scss'],
})
export class FrontcountryCampingAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Frontcountry Camping';
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
        .watchItem(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
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
    this.summaries = [
      {
        isLegacy: this.data?.isLegacy || false,
        title: 'Camping party nights',
        attendanceLabel: 'Total attendance',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: this.data?.campingPartyNightsAttendanceStandard,
            variance: this.variance?.value?.hasOwnProperty('campingPartyNightsAttendanceStandard')
          },
          {
            itemName: 'Senior',
            value: this.data?.campingPartyNightsAttendanceSenior,
            variance: this.variance?.value?.hasOwnProperty('campingPartyNightsAttendanceSenior')
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.campingPartyNightsAttendanceSocial,
            variance: this.variance?.value?.hasOwnProperty('campingPartyNightsAttendanceSocial')
          },
          {
            itemName: 'Long stay',
            value: this.data?.campingPartyNightsAttendanceLongStay,
            variance: this.variance?.value?.hasOwnProperty('campingPartyNightsAttendanceLongStay')
          },
        ],
        attendanceTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyAttendance(this.data?.legacyData?.legacy_frontcountryCampingTotalCampingParties) :
          this.formulaService.frontcountryCampingPartyAttendance(
            [
              this.data?.campingPartyNightsAttendanceStandard,
              this.data?.campingPartyNightsAttendanceSenior,
              this.data?.campingPartyNightsAttendanceSocial,
              this.data?.campingPartyNightsAttendanceLongStay,
            ],
            this.data?.config?.attendanceModifier
          ),
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross camping revenue',
            value: this.data?.isLegacy ?
              this.data?.legacyData?.legacy_frontcountryCampingTotalCampingGrossRevenue :
              this.data?.campingPartyNightsRevenueGross,
              variance: this.variance?.value?.hasOwnProperty('campingPartyNightsRevenueGross')
          },
        ],
        revenueTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_frontcountryCampingTotalCampingNetRevenue) :
          this.formulaService.basicNetRevenue([
            this.data?.campingPartyNightsRevenueGross,
          ]),
      },
      {
        isLegacy: this.data?.isLegacy || false,
        title: 'Second cars / additional vehicles',
        attendanceLabel: 'Total second cars',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: this.data?.secondCarsAttendanceStandard,
            variance: this.variance?.value?.hasOwnProperty('secondCarsAttendanceStandard')
          },
          {
            itemName: 'Senior',
            value: this.data?.secondCarsAttendanceSenior,
            variance: this.variance?.value?.hasOwnProperty('secondCarsAttendanceSenior')
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.secondCarsAttendanceSocial,
            variance: this.variance?.value?.hasOwnProperty('secondCarsAttendanceSocial')
          },
        ],
        attendanceTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyAttendance(this.data?.legacyData?.legacy_frontcountryCampingTotalSecondCarsAttendance) :
          this.formulaService.frontcountryCampingSecondCarAttendance([
            this.data?.secondCarsAttendanceStandard,
            this.data?.secondCarsAttendanceSenior,
            this.data?.secondCarsAttendanceSocial,
          ]),
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross 2nd car revenue',
            value: this.data?.secondCarsRevenueGross,
            variance: this.variance?.value?.hasOwnProperty('secondCarsRevenueGross')
          },
        ],
        revenueTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_frontcountryCampingSecondCarsNetRevenue) :
          this.formulaService.basicNetRevenue([
            this.data?.secondCarsRevenueGross,
          ]),
      },
      ...this.formatOtherFrontcountryRevenue(),
    ];
  }

  // this section is vastly different between legacy and non-legacy
  formatOtherFrontcountryRevenue() {
    if (this.data?.isLegacy) {
      return [{
        isLegacy: true,
        title: 'Other frontcountry camping revenue',
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross sani revenue',
            value: this.data?.otherRevenueGrossSani,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueGrossSani')
          }
        ],
        revenueTotal: this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_dayUseMiscSaniStationNetRevenue),
      },
      {
        isLegacy: true,
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross shower revenue',
            value: this.data?.otherRevenueShower,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueShower')
          }
        ],
        revenueTotal: this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_dayUseMiscShowerNetRevenue),
      },
      {
        isLegacy: true,
        revenueItems: [
          {
            itemName: 'Gross electrical fee revenue',
            value: this.data?.otherRevenueElectrical,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueElectrical')
          }
        ],
      },
      ]
    } else {
      return [{
        isLegacy: false,
        title: 'Other frontcountry camping revenue',
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross sani revenue',
            value: this.data?.otherRevenueGrossSani,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueGrossSani')
          },
          {
            itemName: 'Gross electrical fee revenue',
            value: this.data?.otherRevenueElectrical,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueElectrical')
          },
          {
            itemName: 'Gross shower revenue',
            value: this.data?.otherRevenueShower,
            variance: this.variance?.value?.hasOwnProperty('otherRevenueShower')
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.otherRevenueGrossSani,
          this.data?.otherRevenueElectrical,
          this.data?.otherRevenueShower,
        ]),
      }]
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
