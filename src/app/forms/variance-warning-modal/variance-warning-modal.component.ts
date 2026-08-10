import { AfterViewInit, Component, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-variance-warning-modal',
    templateUrl: './variance-warning-modal.component.html',
    styleUrls: ['./variance-warning-modal.component.scss']
})
export class VarianceWarningModalComponent implements AfterViewInit {
  private modalService = inject(BsModalService);

  @ViewChild('varianceModal') varianceModal: TemplateRef<any>;
  @Output() accept = new EventEmitter;
  @Output() decline = new EventEmitter;

  public modalRef: BsModalRef;

  ngAfterViewInit() {
    this.modalRef = this.modalService.show(this.varianceModal, {
      class: 'modal-lg modal-dialog-centered',
      keyboard: false
    });
    this.modalRef.onHide.subscribe((reason) => {
      if (reason === 'backdrop-click') {
        this.decline.emit();
      }
    });
  }

  confirmClicked() {
    this.modalRef.hide();
    this.accept.emit();
  }

  declineClicked() {
    this.modalRef.hide();
    this.decline.emit();
  }
}
