import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from '../../utils/constants';
import { summarySection } from './summary-section/summary-section.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnDestroy {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() id: string = '';
  @Input() secondaryText: string = '';
  @Input() notes: string = '';
  @Input() summaries: Array<summarySection> = [];
  @Input() editLink: string = '';

  private alive = true;
  private subscriptions: any[] = [];

  private formParams;

  public readonly iconSize = 50; // icon size in px

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected dataService: DataService
  ) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.formParams = res;
          }
        })
    );
  }

  edit() {
    this.router.navigate([this.editLink], {
      relativeTo: this.activatedRoute,
      queryParams: this.formParams,
    });
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
