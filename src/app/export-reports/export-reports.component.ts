import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';

@Component({
  selector: 'app-export-reports',
  templateUrl: './export-reports.component.html',
  styleUrls: ['./export-reports.component.scss'],
})

// TODO: Make a component for exporter cards
export class ExportReportsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public stateDictionary = {
    STANDBY: 0,
    GENERATING: 1,
    READY_TO_DOWNLOAD: 2,
    ERROR: 99,
  };

  public status = 'Standing by';
  public percentageComplete = 0;
  public progressBarTextOverride;
  public disableGenerate = false;
  public disableDownload = true;
  public animated = true;
  public currentState = 0;
  public progressBarColour = 'secondary';
  public signedUrl = '';

  constructor(
    private exportService: ExportService,
    private dataService: DataService
  ) {
    this.subscriptions.add(
      this.dataService
        .getItemValue(Constants.dataIds.EXPORT_ALL_POLLING_DATA)
        .subscribe((res) => {
          if (res) {
            if (res.error) {
              this.setState(this.stateDictionary.ERROR);
              this.status = res.error;
              this.progressBarTextOverride = 'ERROR';
            } else {
              if (res.jobObj.progressPercentage === 100) {
                this.setState(this.stateDictionary.READY_TO_DOWNLOAD);
                this.signedUrl = res.signedURL;
              } else {
                this.setState(this.stateDictionary.GENERATING);
              }
              this.percentageComplete = res.jobObj.progressPercentage;
              this.status = res.jobObj.progressDescription;
            }
          }
        })
    );
  }

  ngOnInit(): void {}

  async generateReport() {
    this.setState(this.stateDictionary.GENERATING);
    this.exportService.generateReport(
      Constants.dataIds.EXPORT_ALL_POLLING_DATA
    );
  }

  setState(state) {
    switch (state) {
      case 0:
        this.animated = true;
        this.status = 'Standing by';
        this.percentageComplete = 0;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = false;
        this.disableDownload = true;
        this.currentState = 0;
        this.progressBarColour = 'secondary';
        break;
      case 1:
        this.animated = true;
        this.status = 'Requesting job';
        this.percentageComplete = 0;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = true;
        this.disableDownload = true;
        this.currentState = 1;
        this.progressBarColour = 'warning';
        break;
      case 2:
        this.animated = false;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = false;
        this.disableDownload = false;
        this.currentState = 2;
        this.progressBarColour = 'success';
        break;
      case 99:
        this.animated = true;
        this.status = 'Error, please try again.';
        this.percentageComplete = 100;
        this.disableGenerate = false;
        this.disableDownload = true;
        this.currentState = 3;
        this.progressBarColour = 'danger';
        break;
      default:
        break;
    }
  }

  downloadReport() {
    if (this.signedUrl) {
      window.open(this.signedUrl, '_blank');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
