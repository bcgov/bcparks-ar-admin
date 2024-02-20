import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

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

  constructor(
    private formulaService: FormulaService,
    protected dataService: DataService
  ) {
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ACCORDION_DAY_USE)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
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
          },
          {
            itemName: 'Bus count',
            value: this.data?.peopleAndVehiclesBus,
          },
          {
            itemName: 'Trail count',
            value: this.data?.peopleAndVehiclesTrail,
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
          },
          {
            itemName: 'Picnic shelter people',
            value: this.data?.picnicShelterPeople,
          },
        ],
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross picnic revenue',
            value: this.data?.picnicRevenueGross,
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
          },
        ],
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross hot springs revenue',
            value: this.data?.otherDayUseRevenueHotSprings,
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
              value: this.data?.legacyData?.legacy_dayUseMiscGrossRevenue
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
