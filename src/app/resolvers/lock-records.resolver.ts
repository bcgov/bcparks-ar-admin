import { Injectable } from '@angular/core';

import { FiscalYearLockService } from '../services/fiscal-year-lock.service';

@Injectable({
  providedIn: 'root'
})
export class LockRecordsResolver  {
  constructor(private fiscalYearLockService: FiscalYearLockService) {}
  resolve() {
    this.fiscalYearLockService.fetchFiscalYear();
  }
}

