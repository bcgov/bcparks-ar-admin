import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent implements OnInit, OnDestroy {
  private alive = true;

  public parks: any[] = [];
  public subAreas: any[] = [];

  constructor(protected dataService: DataService) {
    dataService
      .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res) {
          this.parks = res;
        }
      });
    dataService
      .getItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res) {
          this.subAreas = res;
        }
      });
  }

  parkTypeaheadOutput(event) {
    console.log(event);
  }
  subAreaOutput(event) {
    console.log(event);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }
}
