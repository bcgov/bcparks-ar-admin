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
  selector: 'app-boating-accordion',
  templateUrl: './boating-accordion.component.html',
  styleUrls: ['./boating-accordion.component.scss'],
})
export class BoatingAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Boating';
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
        .watchItem(Constants.dataIds.ACCORDION_BOATING)
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
        attendanceLabel: 'Boat Attendance',
        attendanceItems: [
          {
            itemName: 'Nights on dock',
            value: this.data?.boatAttendanceNightsOnDock,
            variance: this.variance?.value?.hasOwnProperty('boatAttendanceNightsOnDock')
          },
          {
            itemName: 'Nights on buoys',
            value: this.data?.boatAttendanceNightsOnBouys,
            variance: this.variance?.value?.hasOwnProperty('boatAttendanceNightsOnBouys')
          },
          {
            itemName: 'Miscellaneous boats',
            value: this.data?.boatAttendanceMiscellaneous,
            variance: this.variance?.value?.hasOwnProperty('boatAttendanceMiscellaneous')
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
            variance: this.variance?.value?.hasOwnProperty('boatRevenueGross')
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
