import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { Utils } from '../shared/utils/utils';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router,
    private loggerService: LoggerService
  ) {}

  private utils = new Utils();

  setFormParams(params) {
    this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS, params);
  }

  getErrorMsg(err): string {
    try {
      const e = (err as any);
      if (err.status === 409) {
        return 'Record is locked, unable to edit until record is unlocked.'
      }
    } catch (error) {
      // generic error, fall through
    }
    return 'Failed to update report';
  }

  async postActivity(obj) {
    let res;
    try {
      // We require queryParam type = activity
      // In obj we need subAreaId, activity and date
      if (obj.subAreaId && obj.activity && obj.date) {
        res = await firstValueFrom(
          this.apiService.post('subarea', obj, { type: 'activity' })
        );
        this.toastService.addMessage(
          `${obj.activity} - ${this.utils.convertYYYYMMToMMMMYYYY(obj.date)}`,
          `Report Updated`,
          Constants.ToastTypes.SUCCESS
        );
        return res;
      }
    } catch (e) {
      // typescript needs separate function to handle 'e' of type potentially 'unknown'.
      const message = this.getErrorMsg(e);
      this.toastService.addMessage(
        message,
        `Error`,
        Constants.ToastTypes.ERROR
      );

      this.loggerService.error(
        `Post Activity: ${obj.orcs} - ${obj.subAreaName} - ${obj.orcs} - ${obj.date}: ${e}`
      );

      this.router.navigate(['/']);
    }
  }
}
