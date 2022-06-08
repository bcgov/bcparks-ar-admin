import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

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

  constructor(
    protected dataService: DataService,
    protected formulaService: FormulaService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
        .subscribe((res) => {
          this.data = res;
          this.buildAccordion();
        })
    );
  }

  buildAccordion() {
    this.summaries = [
      {
        title: 'Camping party nights',
        attendanceLabel: 'Total attendance',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: this.data?.campingPartyNightsAttendanceStandard,
          },
          {
            itemName: 'Senior',
            value: this.data?.campingPartyNightsAttendanceSenior,
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.campingPartyNightsAttendanceSocial,
          },
          {
            itemName: 'Long stay',
            value: this.data?.campingPartyNightsAttendanceLongStay,
          },
        ],
        attendanceTotal: this.formulaService.frontcountryCampingPartyAttendance(
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
            value: this.data?.campingPartyNightsRevenueGross,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.campingPartyNightsRevenueGross,
        ]),
      },
      {
        title: 'Second cars / additional vehicles',
        attendanceLabel: 'Total second cars',
        attendanceItems: [
          {
            itemName: 'Standard',
            value: this.data?.secondCarsAttendanceStandard,
          },
          {
            itemName: 'Senior',
            value: this.data?.secondCarsAttendanceSenior,
          },
          {
            itemName: 'Social services fee exemption',
            value: this.data?.secondCarsAttendanceSocial,
          },
        ],
        attendanceTotal:
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
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.secondCarsRevenueGross,
        ]),
      },
      {
        title: 'Other frontcountry camping revenue',
        revenueLabel: 'Net revenue',
        revenueItems: [
          {
            itemName: 'Gross sani revenue',
            value: this.data?.otherRevenueGrossSani,
          },
          {
            itemName: 'Gross electrical fee revenue',
            value: this.data?.otherRevenueElectrical,
          },
          {
            itemName: 'Gross shower revenue',
            value: this.data?.otherRevenueShower,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.otherRevenueGrossSani,
          this.data?.otherRevenueElectrical,
          this.data?.otherRevenueShower,
        ]),
      },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
