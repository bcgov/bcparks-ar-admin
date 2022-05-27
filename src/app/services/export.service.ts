import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private pollingRate = 1000;
  private retryPollingRate = 10000;
  private numberOfRetrys = 5;

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  async generateReport(dataId) {
    try {
      const res = await firstValueFrom(this.apiService.get('export'));
      if (res.error) {
        throw res.error;
      }
      this.pollReportStatus(dataId);
      return res;
    } catch (error) {
      this.dataService.setItemValue(dataId, {
        error: 'Unable to create job. Please try again.',
      });
      console.log(error);
      return error;
    }
  }

  async pollReportStatus(dataId, retryCounter = 0) {
    let res;
    try {
      res = await firstValueFrom(
        this.apiService.get('export', { getJob: true })
      );
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      if (this.numberOfRetrys > retryCounter) {
        const retryCount = Number(retryCounter) + 1;
        this.dataService.setItemValue(dataId, {
          error:
            'Error, retry attempt ' + retryCount + ' of ' + this.numberOfRetrys,
        });
        await this.delay(this.retryPollingRate);
        this.pollReportStatus(dataId, retryCount);
        return;
      } else {
        this.dataService.setItemValue(dataId, {
          error: 'Unable to get job information. Please try again.',
        });
        console.log(error);
        return error;
      }
    }

    retryCounter = 0;

    // Every time we poll, we update the data service.
    this.dataService.setItemValue(dataId, res);

    if (res.jobObj.progressPercentage !== 100) {
      // Repeat every second until job is complete.
      await this.delay(this.pollingRate);
      this.pollReportStatus(dataId);
    }
    return;
  }

  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
