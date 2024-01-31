import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SubAreaService } from '../services/sub-area.service';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class SubAreaResolver  {
  constructor(protected subAreaService: SubAreaService) {}
  resolve(route: ActivatedRouteSnapshot) {
    // We need date, orcs and subarea to do a fetch.
    if (
      route.queryParams['date'] &&
      route.queryParams['orcs'] &&
      route.queryParams['subAreaId']
    ) {
      this.subAreaService.fetchSubArea(
        Constants.dataIds.ENTER_DATA_SUB_AREA,
        route.queryParams['orcs'],
        route.queryParams['subAreaId'],
        route.queryParams['date']
      );
    }
  }
}
