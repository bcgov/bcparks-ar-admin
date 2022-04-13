import { Component, OnInit } from '@angular/core';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-day-use-accordion',
  templateUrl: './day-use-accordion.component.html',
  styleUrls: ['./day-use-accordion.component.scss'],
})
export class DayUseAccordionComponent implements OnInit {
  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(private formulaService: FormulaService) {}

  ngOnInit(): void {
    this.buildAccordion();
  }

  buildAccordion() {
    // TODO: fetch day Use Data - using dummy data for now.
    this.data = this.getData();
    this.summaries = [
      {
        title: 'People and vehicles',
        attendanceLabel: 'Vehicle attendance',
        attendanceItems: [
          {
            itemName: 'Trail counter',
            value: this.formulaService.validateLineItemValue(
              this.data.pplTrailCounter
            ),
          },
          {
            itemName: 'Vehicle count',
            value: this.formulaService.validateLineItemValue(
              this.data.pplVehicleCount
            ),
          },
          {
            itemName: 'Bus count',
            value: this.formulaService.validateLineItemValue(
              this.data.pplBusCount
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
              this.data.picnicRentals
            ),
          },
          {
            itemName: 'Gross picnic revenue',
            value: this.formulaService.validateLineItemValue(
              this.data.picnicRevenue
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
              this.data.otherSkiiRevenue
            ),
          },
          {
            itemName: 'Gross hot springs revenue',
            value: this.formulaService.validateLineItemValue(
              this.data.otherHotSpringsRevenue
            ),
          },
        ],
        revenueTotal: 0, // will leverage formulaService
      },
    ];
  }

  getData() {
    // return dummy data for now
    return {
      pplTrailCounter: 4,
      picnicRevenue: 2.5,
      notes: 'Some notes',
      picnicRentals: 5,
      parkName: 'Cultus Lake Park',
      otherHotSpringsRevenue: 5.55,
      orcs: '0041',
      otherSkiiRevenue: 0,
      pplBusCount: 3,
      sk: '202204',
      pk: '0041::Maple Bay::Day Use',
      pplCalculations: {
        vehicleModifier: 3.5,
        busModifier: 40,
      },
      pplVehicleCount: 12,
      subAreaName: 'Maple Bay',
    };
  }
}
