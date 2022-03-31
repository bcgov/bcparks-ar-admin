import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];
  private utils = new Utils();

  public dateFormControl = new FormControl();

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
