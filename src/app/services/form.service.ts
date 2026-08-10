import { Injectable, inject } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private dataService = inject(DataService);


  setFormParams(params) {
    this.dataService.setItemValue(
      Constants.dataIds.ENTER_DATA_URL_PARAMS,
      params
    );
  }
}
