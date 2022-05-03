import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private subscriptions = new Subscription();

  private formParams;

  public readonly iconSize = 50; // icon size in px

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected dataService: DataService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS)
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
    this.subscriptions.unsubscribe();
  }
}
