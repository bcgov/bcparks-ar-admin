import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { EventKeywords, EventObject, EventService } from './event.service';
import { LoadingService } from './loading.service';
import { ToastService, ToastTypes } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class FiscalYearLockService {
  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private eventService: EventService
  ) {}

  // get/check fiscal years
  // passing year = null returns all fiscal year objects
  async fetchFiscalYear(year?) {
    this.loadingService.addToFetchList(
      Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA
    );
    let res;
    let errorSubject = '';
    try {
      errorSubject = 'lock-records-fiscal-years-data';
      if (year) {
        res = await firstValueFrom(
          this.apiService.get('fiscalYearEnd', { fiscalYearEnd: year })
        );
      } else {
        res = await firstValueFrom(this.apiService.get('fiscalYearEnd'));
      }
      this.dataService.setItemValue(
        Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA,
        res
      );
    } catch (e) {
      this.toastService.addMessage(
        'Please refresh the page.',
        `Error getting ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(
          EventKeywords.ERROR,
          String(e),
          'Fiscal Year Lock Service'
        )
      );
      this.dataService.setItemValue(
        Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA,
        'error'
      );
    }
    this.loadingService.removeToFetchList(
      Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA
    );
    return res;
  }

  // lock = true locks, lock = false unlocks
  // must provide year.
  async lockUnlockFiscalYear(year, lock: boolean) {
    this.loadingService.addToFetchList(
      Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA
    );
    let res;
    let errorSubject = '';
    let subPath = 'lock';
    let ptString = 'locked';
    if (!lock) {
      subPath = 'unlock';
      ptString = 'unlocked';
    }
    try {
      errorSubject = `lock-records-${subPath}-fiscal-year`;
      res = await firstValueFrom(
        this.apiService.post(`fiscalYearEnd/${subPath}`, null, {
          fiscalYearEnd: year,
        })
      );
      const prevYear = year - 1;
      // trigger refresh of cached list of fetched fiscal year locks
      this.fetchFiscalYear();
      this.toastService.addMessage(
        `Fiscal year from April ${prevYear} to March ${year} successfully ${ptString}`,
        `Fiscal year ${ptString}`,
        ToastTypes.SUCCESS
      );
    } catch (e) {
      this.toastService.addMessage(
        `Something went wrong during fiscal year ${subPath}`,
        `Error: ${errorSubject}`,
        ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(
          EventKeywords.ERROR,
          String(e),
          'Fiscal Year Lock Service'
        )
      );
    }
    this.loadingService.removeToFetchList(
      Constants.dataIds.LOCK_RECORDS_FISCAL_YEARS_DATA
    );
  }
}
