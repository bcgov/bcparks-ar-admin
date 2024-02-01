import { Injectable } from '@angular/core';

import { ParkService } from '../services/park.service';

@Injectable({
  providedIn: 'root',
})
export class ParkResolver  {
  constructor(private parkService: ParkService) {}
  resolve() {
    this.parkService.fetchEnterDataPark();
  }
}
