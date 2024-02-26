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
  selector: 'app-day-use-accordion',
  templateUrl: './day-use-accordion.component.html',
  styleUrls: ['./day-use-accordion.component.scss'],
})
export class DayUseAccordionComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];
  public newSummaries: summarySection[] = [];
  public miscSummaries: summarySection[] = [];
  public legacyNotes = '';
  public activity = 'Day Use';
  public variance = new BehaviorSubject(null);
  public utils = new Utils();

  constructor(
    private formulaService: FormulaService,
    protected dataService: DataService,
    protected urlService: UrlService,
    protected varianceService: VarianceService
  ) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ACCORDION_DAY_USE)
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
        title: 'People and vehicles',
        attendanceLabel: 'Total attendance (People)',
        attendanceItems: [
          {
            itemName: 'Vehicle count',
            value: this.data?.peopleAndVehiclesVehicle,
            variance: this.variance?.value?.hasOwnProperty('peopleAndVehiclesVehicle')
          },
          {
            itemName: 'Bus count',
            value: this.data?.peopleAndVehiclesBus,
            variance: this.variance?.value?.hasOwnProperty('peopleAndVehiclesBus')
          },
          {
            itemName: 'Trail count',
            value: this.data?.peopleAndVehiclesTrail,
            variance: this.variance?.value?.hasOwnProperty('peopleAndVehiclesTrail')
          },
        ],
        attendanceTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyAttendance(this.data?.legacyData?.legacy_dayUseTotalPeopleAndVehiclesAttendancePeople) :
          this.formulaService.dayUseVehicleAttendance(
            [this.data?.peopleAndVehiclesTrail],
            [this.data?.peopleAndVehiclesVehicle],
            [this.data?.peopleAndVehiclesBus],
            this.data?.config?.attendanceVehiclesModifier,
            this.data?.config?.attendanceBusModifier
          ),
      },
      {
        isLegacy: this.data?.isLegacy,
        title: 'Picnic shelters',
        attendanceItems: [
          {
            itemName: 'Picnic shelter rentals',
            value: this.data?.picnicRevenueShelter,
            variance: this.variance?.value?.hasOwnProperty('picnicRevenueShelter')
          },
          {
            itemName: 'Picnic shelter people',
            value: this.data?.picnicShelterPeople,
            variance: this.variance?.value?.hasOwnProperty('picnicShelterPeople')
          },
        ],
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross picnic revenue',
            value: this.data?.picnicRevenueGross,
            variance: this.variance?.value?.hasOwnProperty('picnicRevenueGross')
          },
        ],
        revenueTotal: this.data?.isLegacy ?
          this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_dayUsePicnicShelterNetRevenue
          ) :
          this.formulaService.basicNetRevenue([
            this.data?.picnicRevenueGross,
          ]),
      },
    ];

    // if not legacy, add hot springs items
    if (!this.data?.isLegacy) {
      this.newSummaries = [{
        title: 'Hot springs',
        attendanceItems: [
          {
            itemName: 'Hot springs people',
            value: this.data?.otherDayUsePeopleHotSprings,
            variance: this.variance?.value?.hasOwnProperty('otherDayUsePeopleHotSprings')
          },
        ],
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross hot springs revenue',
            value: this.data?.otherDayUseRevenueHotSprings,
            variance: this.variance?.value?.hasOwnProperty('otherDayUseRevenueHotSprings')
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.otherDayUseRevenueHotSprings,
        ]),
      }];
    }

    // if legacy, add legacy notes for picnic shelters
    // if legacy, add items for miscellaneous day use
    if (this.data?.isLegacy) {
      this.legacyNotes = this.data?.legacyData?.legacy_dayUsePicnicShelterVarianceNote;
      this.miscSummaries = [
        {
          isLegacy: true,
          title: 'Miscellaneous Day Use',
          revenueItems: [
            {
              itemName: 'Gross misc revenue',
              value: this.data?.legacyData?.legacy_dayUseMiscGrossRevenue,
              variance: this.variance?.value?.hasOwnProperty('legacy_dayUseMiscGrossRevenue')
            }
          ],
          revenueLabel: 'Net revenue',
          revenueTotal: this.formulaService.formatLegacyRevenue(this.data?.legacyData?.legacy_dayUseMiscNetRevenue
          ),
        }
      ]
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
