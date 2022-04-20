import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(public apiService: ApiService) {}

  async postActivity(obj) {
    let res;
    try {
      // We require queryParam type = activity
      // In obj we need orcs, subAreaName, activity and date
      if (obj.orcs && obj.subAreaName && obj.activity && obj.date) {
        delete obj.pk;
        delete obj.sk;
        res = await this.apiService.post('subarea', obj, { type: 'activity' });
      }
    } catch (e) {
      // TODO: Deal with error here
    }
  }
}
