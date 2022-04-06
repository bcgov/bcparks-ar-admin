import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];
  private utils = new Utils();

  public parks = { typeAheadData: [] as any[] };
  public subAreas = { selectData: [] as any[] };
  public typeAheadDisabled = true;
  public subAreaDisabled = true;
  public continueDisabled = true;

  public selectedPark;
  public selectedSubArea;

  public modelDate = '';

  constructor(protected dataService: DataService) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res && res.typeAheadData.length > 0) {
            this.parks = res;
            this.typeAheadDisabled = false;
          }
        })
    );
  }

  parkTypeaheadOutput(event) {
    this.selectedPark = this.parks[event];
    this.subAreas = this.utils.convertArrayIntoObjForSelect(
      this.selectedPark.subareas,
      'type',
      'type',
      'name'
    );
    this.subAreaDisabled = false;
    console.log('This is the selected park:', this.selectedPark);
  }

  subAreaOutput(event) {
    this.selectedSubArea = this.subAreas[event];
    this.continueDisabled = false;
    console.log('This is the selected sub-area:', this.selectedSubArea);
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
