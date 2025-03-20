import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-review-modal',
    templateUrl: './review-modal.component.html',
    styleUrls: ['./review-modal.component.scss'],
    standalone: false
})
export class ReviewModalComponent implements AfterViewInit {
  @ViewChild('reviewModal') reviewModal: TemplateRef<any>;

  @Input() title: string;
  @Input() oldData: any[];
  @Input() newData: any[];
  @Input() editMode: boolean = false;

  @Output() accept = new EventEmitter;
  @Output() decline = new EventEmitter;

  public modalRef: BsModalRef;
  public properties = [];

  constructor(
    private modalService: BsModalService
  ) { }

  ngAfterViewInit() {
    this.modalRef = this.modalService.show(this.reviewModal, {
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
