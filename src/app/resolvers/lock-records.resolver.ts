import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { FiscalYearLockService } from '../services/fiscal-year-lock.service';

@Injectable({
  providedIn: 'root'
})
export class LockRecordsResolver implements Resolve<void> {
  constructor(private fiscalYearLockService: FiscalYearLockService) {}
  resolve() {
    this.fiscalYearLockService.fetchFiscalYear();
  }
}

