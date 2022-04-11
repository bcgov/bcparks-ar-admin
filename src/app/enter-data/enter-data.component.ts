import { Component } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent {
  private alive = true;
  private subscriptions: any[] = [];
  public subAreaData;

  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past enteries, you can do that by selecting
  the date and location you want to view.`;

  constructor(protected dataService: DataService) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.subAreaData = res;
          console.log(this.subAreaData);
        })
    );
  }
}
