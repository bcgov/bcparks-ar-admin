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

  constructor(
    private formulaService: FormulaService,
    protected dataService: DataService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ACCORDION_DAY_USE)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
  }

  buildAccordion() {
    this.summaries = [
      {
        title: 'People and vehicles',
        attendanceLabel: 'Total attendance',
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
        attendanceTotal: this.formulaService.dayUseVehicleAttendance(
          [this.data?.peopleAndVehiclesTrail],
          [this.data?.peopleAndVehiclesVehicle],
          [this.data?.peopleAndVehiclesBus],
          this.data?.config?.attendanceVehiclesModifier,
          this.data?.config?.attendanceBusModifier
        ),
      },
      {
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
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.picnicRevenueGross,
        ]),
      },
      {
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
      },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
