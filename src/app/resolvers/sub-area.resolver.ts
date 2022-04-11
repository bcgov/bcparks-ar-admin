import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SubAreaService } from '../services/sub-area.service';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class SubAreaResolver implements Resolve<void> {
  constructor(private subAreaService: SubAreaService) {}
  resolve() {
    // this.subAreaService.fetchData(Constants.dataIds.ENTER_DATA_SUB_AREA);
  }
}
