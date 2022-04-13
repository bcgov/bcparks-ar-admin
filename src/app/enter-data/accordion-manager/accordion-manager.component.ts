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

  public accordions = {
    frontcountryCamping: false,
    frontcountryCabins: false,
    backcountryCamping: false,
    backcountryCabins: false,
    groupCamping: false,
    dayUse: false,
    boating: false,
  };

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
    this.accordions = {
      frontcountryCamping: false,
      frontcountryCabins: false,
      backcountryCamping: false,
      backcountryCabins: false,
      groupCamping: false,
      dayUse: false,
      boating: false,
    };
  }

  buildAccordions() {
    this.resetAccordions();
    if (this.subAreaData?.activities) {
      for (let activity of this.subAreaData.activities) {
        switch (activity) {
          case 'Frontcountry Camping':
            this.accordions.frontcountryCamping = true;
            break;
          case 'Frontcountry Cabins':
            this.accordions.frontcountryCabins = true;
            break;
          case 'Backcountry Camping':
            this.accordions.backcountryCamping = true;
            break;
          case 'Backcountry Cabins':
            this.accordions.backcountryCabins = true;
            break;
          case 'Group Camping':
            this.accordions.groupCamping = true;
            break;
          case 'Day Use':
            this.accordions.dayUse = true;
            break;
          case 'Boating':
            this.accordions.boating = true;
            break;
        }
      }
    }
  }
}
