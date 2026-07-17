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
    selector: 'app-backcountry-camping-accordion',
    templateUrl: './backcountry-camping-accordion.component.html',
    styleUrls: ['./backcountry-camping-accordion.component.scss'],
    standalone: false
})
export class BackcountryCampingAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Backcountry Camping';
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
        .watchItem(Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING)
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
    // BRS-368: business logic to show grossCampingRevenue after migration.
    // Some records will be legacy and be vastly different, but some will have
    // both attribute data - keep `if` logic to differentiate in the future.
    if (this.data?.isLegacy) {
      this.summaries = [
        {
          title: 'Non-resident revenue',
          revenueLabel: 'Non-resident net revenue',
          revenueItems: [
            {
              itemName: 'Gross non-resident revenue (in-park collection only)',
              value: this.data?.otherRevenueGrossNonResident,
              variance: this.variance?.value?.hasOwnProperty('otherRevenueGrossNonResident')
            },
          ],
          revenueTotal: this.formulaService.nonResidentNetRevenue([
            this.data?.otherRevenueGrossNonResident,
          ]),
        },
        {
          attendanceItems: [
            {
              itemName: 'People',
              value: this.data?.people,
              variance: this.variance?.value?.hasOwnProperty('people')
            }
          ],
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross camping revenue',
              value: this.data?.grossCampingRevenue,
              variance: this.variance?.value?.hasOwnProperty('grossCampingRevenue')
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.grossCampingRevenue,
          ]),
        },
      ];
    } else {
      this.summaries = [
        {
          attendanceItems: [
            {
              itemName: 'Adults (16+)',
              value: this.data?.peopleAdult,
              variance: this.variance?.value?.hasOwnProperty('peopleAdult')
            },
            {
              itemName: 'Youths (6-15)',
              value: this.data?.peopleYouth,
              variance: this.variance?.value?.hasOwnProperty('peopleYouth')
            }
          ],
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross camping revenue',
              value: this.data?.grossCampingRevenue,
              variance: this.variance?.value?.hasOwnProperty('grossCampingRevenue')
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.grossCampingRevenue,
          ]),
        },
        {
          title: 'Other backcountry camping revenue',
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross non-resident revenue (in-park collection only)',
              value: this.data?.otherRevenueGrossNonResident,
              variance: this.variance?.value?.hasOwnProperty('otherRevenueGrossNonResident')
            },
          ],
          revenueTotal: this.formulaService.nonResidentNetRevenue([
            this.data?.otherRevenueGrossNonResident,
          ]),
        },
      ];
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
