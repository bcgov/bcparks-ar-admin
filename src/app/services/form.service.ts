import { Injectable } from '@angular/core';
import { Constants } from '../shared/utils/constants';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private dataService: DataService) {}

  setFormParams(params) {
    this.dataService.setItemValue(
      Constants.dataIds.ENTER_DATA_URL_PARAMS,
      params
    );
  }
}
