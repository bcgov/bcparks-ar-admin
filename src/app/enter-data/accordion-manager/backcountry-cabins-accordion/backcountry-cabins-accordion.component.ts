import { Component, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { UrlService } from 'src/app/services/url.service';
import { VarianceService } from 'src/app/services/variance.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { AccordionSummariesComponent } from '../../../shared/components/accordion/accordion-summaries/accordion-summaries.component';
import { AccordionNotesComponent } from '../../../shared/components/accordion/accordion-notes/accordion-notes.component';

@Component({
    selector: 'app-backcountry-cabins-accordion',
    templateUrl: './backcountry-cabins-accordion.component.html',
    styleUrls: ['./backcountry-cabins-accordion.component.scss'],
    imports: [AccordionComponent, AccordionSummariesComponent, AccordionNotesComponent]
})
export class BackcountryCabinsAccordionComponent implements OnDestroy {
  protected dataService = inject(DataService);
  protected formulaService = inject(FormulaService);
  protected varianceService = inject(VarianceService);
  protected urlService = inject(UrlService);

  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public activity = 'Backcountry Cabins';
  public variance = new BehaviorSubject(null);
  public utils = new Utils();

  constructor() {
    const dataService = this.dataService;

    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ACCORDION_BACKCOUNTRY_CABINS)
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
        isLegacy: this.data?.isLegacy,
        attendanceLabel: 'Total People',
        attendanceItems: [
          {
            itemName: 'Adults (16+)',
            value: this.data?.peopleAdult,
            variance: this.variance?.value?.hasOwnProperty('peopleAdult')
          },
          {
            itemName: 'Youths (6-15)',
            value: this.data?.peopleChild,
            variance: this.variance?.value?.hasOwnProperty('peopleChild')
          },
          {
            itemName: 'Family',
            value: this.data?.peopleFamily,
            variance: this.variance?.value?.hasOwnProperty('peopleFamily')
          },
        ],
        attendanceTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyAttendance(this.data?.legacyData?.legacy_backcountryCabinsTotalAttendancePeople) :
          this.formulaService.backcountryCabinsAttendance(
            [this.data?.peopleAdult, this.data?.peopleChild],
            [this.data?.peopleFamily],
            this.data?.config?.attendanceModifier
          ),
      },
      ...this.formatBackcountryCabinRevenue(),
    ];
  }

  formatBackcountryCabinRevenue() {
    if (this.data?.isLegacy) {
      return [
        {
          isLegacy: true,
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross cabin revenue',
              value: this.data?.revenueFamily,
              variance: this.variance?.value?.hasOwnProperty('revenueFamily')
            },
          ],
          revenueTotal: this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_backcountryCabinsNetRevenue
          )
        },
        {
          isLegacy: true,
          title: 'Non-resident revenue',
          revenueLabel: 'NET REVENUE',
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
    } else {
      return [
        {
          revenueLabel: 'Net revenue',
          revenueItems: [
            {
              itemName: 'Gross Backcountry Cabin Revenue',
              value: this.data?.revenueFamily,
              variance: this.variance?.value?.hasOwnProperty('revenueFamily')
            },
          ],
          revenueTotal: this.formulaService.basicNetRevenue([
            this.data?.revenueFamily,
          ]),
        },
        {
          title: 'Non-resident revenue',
          revenueLabel: 'NET REVENUE',
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
