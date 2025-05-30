import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-cancel-button',
    templateUrl: './cancel-button.component.html',
    styleUrls: ['./cancel-button.component.scss'],
    standalone: false
})
export class CancelButtonComponent implements OnDestroy {
  @Input() disabled = false;

  private navParams = {};
  public subscriptions = new Subscription();
  public alive = true;
  modalRef?: BsModalRef;
  message?: string;
  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: BsModalService
  ) {
    this.subscriptions.add(
      this.dataService
        .watchItem(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .subscribe((res) => {
          if (res) {
            this.navParams['date'] = res.date;
            this.navParams['parkName'] = res.parkName;
            this.navParams['subAreaName'] = res.subAreaName;
            this.navParams['subAreaId'] = res.subAreaId;
            this.navParams['orcs'] = res.orcs;
          }
        })
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.router.navigate(['enter-data'], { queryParams: this.navParams });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
