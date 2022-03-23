import { Injectable } from '@angular/core';
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
    private apiService: ApiService,
    private eventService: EventService,
    private toastService: ToastService
  ) {}

  async fetchData(id) {
    let res;
    let errorSubject = '';
    try {
      // we're getting a single item
      errorSubject = 'sub-area';

      // TODO: Enable this when our endpoint is ready
      // res = await firstValueFrom(this.apiService.get('sub-area'));

      // For now we are mocking data
      res = [
        { id: 'frontcountry-camping', label: 'Frontcountry Camping' },
        { id: 'day-use', label: 'Day Use' },
        { id: 'group-camping', label: 'Group Camping' },
      ];

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
