import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventKeywords, EventObject, EventService } from './event.service';
import { ToastService, ToastTypes } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ParkService {
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
      errorSubject = 'park';

      // TODO: Enable this when our endpoint is ready
      // res = await firstValueFrom(this.apiService.get('park'));

      // For now we are mocking data
      res = [
        'Alice Lake Provincial Park',
        'Bear Creek Provincial Park',
        'E.C. Manning Provincial Park',
        'Goldstream Provincial Park',
        'Juniper Beach Provincial Park',
        'Kekuli Bay Provincial Park',
        'Kikomun Creek Provincial Park',
        'Kokanee Creek Provincial Park',
        'Lakelse Lake Provincial Park',
        'McDonald Creek Provincial Park',
        'Mount Robson Provincial Park',
        'Meziadin Lake Provincial Park',
        'Porteau Cove Provincial Park',
        'Shuswap Lake Provincial Park',
        'Steelhead Provincial Park',
        'Syringa Provincial Park',
        'Tyhee Lake Provincial Park',
      ];

      this.dataService.setItemValue(id, res);
    } catch (e) {
      this.toastService.addMessage(
        `Please refresh the page.`,
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, String(e), 'Park Service')
      );
      // TODO: We may want to change this.
      this.dataService.setItemValue(id, 'error');
    }
  }
}
