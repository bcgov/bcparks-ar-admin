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
    this.convertToSentenceCase();
  }

  // This function converts the value of the Activities field to sentence case
  // It is here to satisfy the designs of the implementation ticket as the 
  // designs display the activities as sentence case, but the API expects
  // the activities to be in capital case, so we have to diverge here.
  // https://github.com/bcgov/bcparks-ar-admin/issues/427
  convertToSentenceCase() {
    let activities = this.newData.find(item => item.label === 'Activities');
    let convertedActivities = [];
    let separatedActivities = activities.value.split(', ');
    for (const activity of separatedActivities) {
      let words = activity.split(' ') || activity;
      if (words && words.length > 1) {
        for (let i = 1; i <= words.length - 1; i++) {
          words[i] = words[i]?.toLowerCase();
        }
      }
      const convertedActivity = words.join(' ');
      convertedActivities.push(convertedActivity);
    }
    this.newData.splice(this.newData.indexOf(activities), 1);
    this.newData.push({
      label: 'Activities',
      value: convertedActivities.join(', ')
    })
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
