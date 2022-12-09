import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private pollingRate = 1000;
  private retryPollingRate = 10000;
  private retryTimeout = 300000 // 5 minutes
  private numberOfRetrys = 5;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private loggerService: LoggerService
  ) {}

  async checkForReports(dataId, errorObj = {}) {
    let res;
    try {
      this.loggerService.debug(`Export GET job`);
      res = await firstValueFrom(
        this.apiService.get('export', { getJob: true })
        );
        if (Object.keys(errorObj).length > 0) {
          res.error = errorObj;
        }
      this.dataService.setItemValue(dataId, res);
    } catch (error) {
      this.dataService.setItemValue(dataId, null);
    }
  }

  async generateReport(dataId) {
    try {
      this.loggerService.debug(`Export GET`);
      const res = await firstValueFrom(this.apiService.get('export'));
      if (res.error) {
        throw res.error;
      }
      this.pollReportStatus(dataId);
      return res;
    } catch (error) {
      this.loggerService.error(`${error}`);
      this.checkForReports(dataId, {
        state: 'error',
        msg: 'Unable to create job. Please try again.'
      })
      return error;
    }
  }

  async pollReportStatus(dataId) {
    const maxAttempts = this.retryTimeout / this.pollingRate;
    let attempts = 0;
    let pollObj = {
      dataId: dataId,
      retryCount: 0,
      state: 'polling',
    };
    // Poll for results.
    do {
      attempts += 1;
      // If result is taking too long, stop polling.
      if (attempts >= maxAttempts) {
        this.checkForReports(pollObj.dataId, {
          state: 'error',
          msg: 'Function timeout. Please try again.',
        });
        break;
      }
      pollObj = await this.pollTick(pollObj);
    } while (pollObj.state !== 'finished');
    return;
  }

  async pollTick(pollObj) {
    let tickObj = pollObj;
    let res;
    try {
      // Check for existing job status.
      this.loggerService.debug(`Export GET job pollTick`);
      res = await firstValueFrom(
        this.apiService.get('export', { getJob: true })
      );
      if (res.error || res.jobObj.progressState === 'error') {
        throw 'error';
      }
    } catch (error) {
      this.loggerService.error(`${error}`);
      // If error, retry fetch/generation up to number of max retries.
      if (this.numberOfRetrys > pollObj.retryCount) {
        const retries = pollObj.retryCount + 1;
        this.dataService.setItemValue(pollObj.dataId, {
          error: {
            state: 'retrying',
            msg:
              'Error, retry attempt ' + retries + ' of ' + this.numberOfRetrys,
          },
        });
        await this.delay(this.retryPollingRate);
        // If report generation error, attempt to regenerate.
        if (res.jobObj.progressState === 'error') {
          this.dataService.setItemValue(pollObj.dataId, null);
          await firstValueFrom(this.apiService.get('export'));
        }
        tickObj.retryCount = retries;
        tickObj.state = 'retrying';
        return tickObj;
      }
      // Max retries exceeded. Stop polling.
      // Check for previously generated reports so user can still access them.
      this.checkForReports(tickObj.dataId, {
        state: 'error',
        msg: 'Unable to get job information. Please try again.',
      });
      tickObj.state = 'finished';
      return tickObj;
    }
    // Every time we poll, we update the data service.
    this.dataService.setItemValue(pollObj.dataId, res);
    if (res.jobObj && res.jobObj.progressState !== 'complete') {
      await this.delay(this.pollingRate);
      return tickObj;
    }
    tickObj.state = 'finished';
    return tickObj;
  }

  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
