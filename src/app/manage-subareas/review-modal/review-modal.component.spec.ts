import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModalComponent } from './review-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewModalComponent ],
      providers: [ BsModalService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    component['newData'] = [{
      label: 'test',
      value: 'test',
    }],
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', async () => {
    const confirmSpy = spyOn(component.accept, 'emit');
    component.confirmClicked();
    expect(confirmSpy).toHaveBeenCalled();
  })
  it('should decline', async () => {
    const declineSpy = spyOn(component.decline, 'emit');
    component.declineClicked();
    expect(declineSpy).toHaveBeenCalled();
  })
});
