import { Injectable, inject } from '@angular/core';

import { ParkService } from '../services/park.service';

@Injectable({
  providedIn: 'root',
})
export class ParkResolver  {
  private parkService = inject(ParkService);

  resolve() {
    this.parkService.fetchEnterDataPark();
  }
}
