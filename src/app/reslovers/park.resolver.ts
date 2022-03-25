import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ParkService } from '../services/park.service';

@Injectable({
  providedIn: 'root',
})
export class ParkResolver implements Resolve<void> {
  constructor(private parkService: ParkService) {}
  resolve() {
    this.parkService.fetchEnterDataPark();
  }
}
