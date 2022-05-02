import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
})
export class CancelButtonComponent implements OnDestroy {
  @Input() disabled = false;

  private navParams = {};
  public subscriptions: any[] = [];
  public alive = true;
  modalRef?: BsModalRef;
  message?: string;
  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: BsModalService
  ) {
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.navParams['date'] = res.date;
            this.navParams['parkName'] = res.parkName;
            this.navParams['subAreaName'] = res.subAreaName;
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
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i]?.unsubscribe();
    }
  }
}
