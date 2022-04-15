import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
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
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(
    private formulaService: FormulaService,
    protected dataService: DataService
  ) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_DAY_USE)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        title: 'People and vehicles',
        attendanceLabel: 'Vehicle attendance',
        attendanceItems: [
          {
            itemName: 'Trail counter',
            value: this.formulaService.validateLineItemValue(
              this.data?.peopleAndVehiclesTrail
            ),
          },
          {
            itemName: 'Vehicle count',
            value: this.formulaService.validateLineItemValue(
              this.data?.peopleAndVehiclesVehicle
            ),
          },
          {
            itemName: 'Bus count',
            value: this.formulaService.validateLineItemValue(
              this.data?.peopleAndVehiclesBus
            ),
          },
        ],
        attendanceTotal: 0, // will leverage formulaService
      },
      {
        title: 'Picnic shelters',
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Picnic shelter rentals',
            value: this.formulaService.validateLineItemValue(
              this.data?.picnicRevenueShelter
            ),
          },
          {
            itemName: 'Gross picnic revenue',
            value: this.formulaService.validateLineItemValue(
              this.data?.picnicRevenueGross
            ),
          },
        ],
        revenueTotal: 0, // will leverage formulaService
      },
      {
        title: 'Other day use',
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross skiing revenue',
            value: this.formulaService.validateLineItemValue(
              this.data?.otherDayUseRevenueSkii
            ),
          },
          {
            itemName: 'Gross hot springs revenue',
            value: this.formulaService.validateLineItemValue(
              this.data?.otherDayUseRevenueHotSprings
            ),
          },
        ],
        revenueTotal: 0, // will leverage formulaService
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
