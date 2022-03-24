import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnDestroy {
  private alive = true;

  public parks: any[] = [];
  public subAreas: any[] = [];

  private subscriptions: any[] = [];

  constructor(protected dataService: DataService) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.parks = res;
          }
        })
    );

    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.subAreas = res;
          }
        })
    );
  }

  parkTypeaheadOutput(event) {
    console.log(event);
  }

  subAreaOutput(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
