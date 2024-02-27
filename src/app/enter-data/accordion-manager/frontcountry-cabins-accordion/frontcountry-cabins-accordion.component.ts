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
  selector: 'app-frontcountry-cabins-accordion',
  templateUrl: './frontcountry-cabins-accordion.component.html',
  styleUrls: ['./frontcountry-cabins-accordion.component.scss'],
})
export class FrontcountryCabinsAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Frontcountry Cabins';
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
        .watchItem(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CABINS)
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
    if (this.data?.isLegacy) {
      this.summaries = [
        {
          isLegacy: true,
          attendanceItems: [
            {
              itemName: 'Parties',
              value: this.data?.totalAttendanceParties,
              variance: this.variance?.value?.hasOwnProperty('totalAttendanceParties')
            },
          ],
          revenueItems: [
            {
              itemName: 'Gross camping revenue',
              value: this.data?.revenueGrossCamping,
              variance: this.variance?.value?.hasOwnProperty('revenueGrossCamping')
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
              variance: this.variance?.value?.hasOwnProperty('totalAttendanceParties')
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
              variance: this.variance?.value?.hasOwnProperty('revenueGrossCamping')
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
