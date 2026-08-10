import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { FrontcountryCampingAccordionComponent } from './frontcountry-camping-accordion/frontcountry-camping-accordion.component';
import { FrontcountryCabinsAccordionComponent } from './frontcountry-cabins-accordion/frontcountry-cabins-accordion.component';
import { GroupCampingAccordionComponent } from './group-camping-accordion/group-camping-accordion.component';
import { DayUseAccordionComponent } from './day-use-accordion/day-use-accordion.component';
import { BackcountryCampingAccordionComponent } from './backcountry-camping-accordion/backcountry-camping-accordion.component';
import { BackcountryCabinsAccordionComponent } from './backcountry-cabins-accordion/backcountry-cabins-accordion.component';
import { BoatingAccordionComponent } from './boating-accordion/boating-accordion.component';
import { CenteredTextBlockComponent } from '../../shared/components/centered-text-block/centered-text-block.component';

@Component({
    selector: 'app-accordion-manager',
    templateUrl: './accordion-manager.component.html',
    styleUrls: ['./accordion-manager.component.scss'],
    imports: [FrontcountryCampingAccordionComponent, FrontcountryCabinsAccordionComponent, GroupCampingAccordionComponent, DayUseAccordionComponent, BackcountryCampingAccordionComponent, BackcountryCabinsAccordionComponent, BoatingAccordionComponent, CenteredTextBlockComponent]
})
export class AccordionManagerComponent implements OnDestroy {
  protected dataService = inject(DataService);

  public icons = Constants.iconUrls;

  private subscriptions = new Subscription();
  public subAreaData;
  public unlistedActivityData;

  private mappedAccordionItems = {
    collapsefrontcountryCamping: 'frontcountryCamping',
    collapsefrontcountryCabins: 'frontcountryCabins',
    collapsegroupCamping: 'groupCamping',
    collapsedayuse: 'dayuse',
    collapsebackcountryCamping: 'backcountryCamping',
    collapsebackcountryCabins: 'backcountryCabins',
    collapseboating: 'boating',
  };

  public accordions = {
    frontcountryCamping: false,
    frontcountryCabins: false,
    backcountryCamping: false,
    backcountryCabins: false,
    groupCamping: false,
    dayUse: false,
    boating: false,
  };

  constructor() {
    const dataService = this.dataService;

    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .subscribe((res) => {
          this.subAreaData = res;
          this.buildAccordions();
        })
    );
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST)
        .subscribe((res) => {
          this.unlistedActivityData = res;
          this.buildAccordions();
        })
    );
  }

  accordionToggle(currentId) {
    let clickedItem = document.getElementById(currentId);

    // Collapse anything else if it's open besides the one transitioning to collapsed or show
    if (clickedItem && clickedItem.classList.contains('collapsing')) {
      const keys = Object.keys(this.mappedAccordionItems);
      for (const key in keys) {
        // Don't touch the one we are actively getting clicked on
        if (
          this.mappedAccordionItems[keys[key]] !==
          this.mappedAccordionItems[currentId]
        ) {
          let item = document.getElementById(keys[key]);
          let clickEvent = new Event('click');

          // Check if it's open.
          if (item && item.classList.contains('show')) {
            let hideItem = document.getElementById(
              this.mappedAccordionItems[keys[key]]
            )?.firstChild;
            if (hideItem) {
              hideItem.dispatchEvent(clickEvent);
            }
          }
        }
      }
    }
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

    const keys = Object.keys(this.mappedAccordionItems);
    for (const key in keys) {
      let item = document.getElementById(keys[key]);
      let clickEvent = new Event('click');
      // Check if it's open.
      if (item && item.classList.contains('show')) {
        let hideItem = document.getElementById(
          this.mappedAccordionItems[keys[key]]
        )?.firstChild;
        if (hideItem) {
          hideItem.dispatchEvent(clickEvent);
        }
      }
    }
  }

  buildAccordions() {
    this.resetAccordions();
    if (this.subAreaData?.activities && !this.subAreaData.isLegacy) {
      this.showAccordions(this.subAreaData.activities);
    }
    // No matter what, we must do an additional check for legacy data.
    this.showAccordions(this.unlistedActivityData);
  }

  showAccordions(activities) {
    if (activities?.length) {
      for (const activity of activities) {
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

  noAccordions() {
    if (!this.subAreaData) {
      return false;
    }
    let noAccordions = true;
    for (const accordion in this.accordions) {
      if (this.accordions[accordion]) {
        noAccordions = false;
        break;
      }
    }
    return noAccordions;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
