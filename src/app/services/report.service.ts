// import { Injectable } from '@angular/core';
// import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
// import { ApiService } from './api.service';
// import { DataService } from './data.service';
// import { EventKeywords, EventObject, EventService } from './event.service';
// import { ToastService, ToastTypes } from './toast.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ReportService {
//   constructor(
//     private dataService: DataService,
//     private apiService: ApiService,
//     private eventService: EventService,
//     private toastService: ToastService
//   ) {}

//   async fetchData(id) {
//     let res;
//     let errorSubject = '';
//     try {
//       // we're getting a single item
//       errorSubject = 'report';
//       res = await firstValueFrom(this.apiService.get('report'));
//       this.dataService.setItemValue(id, res);
//     } catch (e) {
//       this.toastService.addMessage(
//         `Please refresh the page.`,
//         `Error getting ${errorSubject}`,
//         ToastTypes.ERROR
//       );
//       this.eventService.setError(
//         new EventObject(EventKeywords.ERROR, String(e), 'Report Service')
//       );
//       // TODO: We may want to change this.
//       this.dataService.setItemValue(id, 'error');
//     }
//   }
// }
