import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SubAreaService } from '../services/sub-area.service';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/utils/constants';
import { FormService } from '../services/form.service';

@Injectable({
  providedIn: 'root',
})
export class FormResolver  {
  constructor(
    protected subAreaService: SubAreaService,
    protected dataService: DataService,
    protected formService: FormService
  ) {}
  async resolve(route: ActivatedRouteSnapshot) {
    const activity = route.data['activity'];
    this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS, route.queryParams);
    if (
      !this.dataService.checkIfDataExists('accordion-' + activity) &&
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
      this.formService.setFormParams(route.queryParams);
    }
  }
}
