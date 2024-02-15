import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceWarningModalComponent } from './variance-warning-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('VarianceWarningModalComponent', () => {
  let component: VarianceWarningModalComponent;
  let fixture: ComponentFixture<VarianceWarningModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarianceWarningModalComponent],
      providers: [BsModalService]
    });
    fixture = TestBed.createComponent(VarianceWarningModalComponent);
    component = fixture.componentInstance;
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
