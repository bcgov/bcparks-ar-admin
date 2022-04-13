import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-accordion-manager',
  templateUrl: './accordion-manager.component.html',
  styleUrls: ['./accordion-manager.component.scss'],
})
export class AccordionManagerComponent implements OnInit {
  public icons = Constants.iconUrls;

  private alive = true;
  private subscriptions: any[] = [];
  public subAreaData;

  public frontcountryCamping: boolean = false;
  public frontcountryCabins: boolean = false;
  public backcountryCamping: boolean = false;
  public backcountryCabins: boolean = false;
  public groupCamping: boolean = false;
  public dayUse: boolean = false;
  public boating: boolean = false;

  public accordions = [
    this.frontcountryCamping,
    this.frontcountryCabins,
    this.backcountryCamping,
    this.backcountryCabins,
    this.groupCamping,
    this.dayUse,
    this.boating,
  ];

  constructor(protected dataService: DataService) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.subAreaData = res;
          this.onChange();
        })
    );
  }

  ngOnInit(): void {}

  onChange(): void {
    this.buildAccordions();
  }

  resetAccordions() {
    for (let accordion of this.accordions) {
      accordion = false;
    }
  }

  buildAccordions() {
    this.resetAccordions();
    if (this.subAreaData?.activities) {
      for (let activity of this.subAreaData.activities) {
        switch (activity) {
          case 'Frontcountry Camping':
            this.frontcountryCamping = true;
            break;
          case 'Frontcountry Cabins':
            this.frontcountryCabins = true;
            break;
          case 'Backcountry Camping':
            this.backcountryCamping = true;
            break;
          case 'Backcountry Cabins':
            this.backcountryCabins = true;
            break;
          case 'Group Camping':
            this.groupCamping = true;
            break;
          case 'Day Use':
            this.dayUse = true;
            break;
          case 'Boating':
            this.boating = true;
            break;
        }
      }
    }
  }
}
