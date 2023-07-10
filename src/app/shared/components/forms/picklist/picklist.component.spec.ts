import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicklistComponent } from './picklist.component';
import { UntypedFormControl, Validators } from '@angular/forms';

describe('PicklistComponent', () => {
  let component: PicklistComponent;
  let fixture: ComponentFixture<PicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicklistComponent);
    component = fixture.componentInstance;
    component.options = [
      {
        value: 'test',
        display: 'test'
      },
      {
        value: 'test2',
        display: 'test2'
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should determine if control is required', async () => {
    component.control = new UntypedFormControl;
    expect(component.isRequired()).toBe(false);
    component.control.addValidators([Validators.required])
    component.control.updateValueAndValidity();
    expect(component.isRequired()).toBe(true)
  })

  it('should set control ability', async () => {
    component.setDisabled(true);
    expect(component.control.disabled).toBe(true);
    component.setDisabled(false);
    expect(component.control.enabled).toBe(true);
  })
});
