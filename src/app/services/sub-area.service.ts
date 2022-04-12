import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventService, EventObject, EventKeywords } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {}

  async fetchSubArea(id, orcs, subAreaName) {
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area';

      res = await firstValueFrom(
        this.apiService.get('park', { orcs: orcs, subAreaName: subAreaName })
      );
      res = res[0];

      this.dataService.setItemValue(id, res);
    } catch (e) {
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(e), 'Sub-area Service')
      );
      // TODO: We may want to change this.
      this.dataService.setItemValue(id, 'error');
    }
  }

  //subarea?orcs=0041&subAreaName=Maple%20Bay&activity=Day%20Use&date=202204
  async fetchActivityDetails(id, orcs, subAreaName, activity, date) {
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area-activity';

      res = await firstValueFrom(
        this.apiService.get('subarea', {
          orcs: orcs,
          subAreaName: subAreaName,
          activity: activity,
          date: date,
        })
      );

      console.log(res);
      this.dataService.setItemValue(id, res);
    } catch (e) {
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(e), 'Sub-area Service')
      );
      // TODO: We may want to change this.
      this.dataService.setItemValue(id, 'error');
    }
  }
}
