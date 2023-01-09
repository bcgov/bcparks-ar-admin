import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDate, NgbDatepicker, NgbDateStructAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DatePickerComponent } from './date-picker.component';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
  EventEmitter,
  OnDestroy,
  SimpleChange,
} from '@angular/core';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgbDatepicker, NgbModule, ReactiveFormsModule, FormsModule
      ],
      declarations: [DatePickerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl();
    component.reset = new EventEmitter();
  });

  it('should create', async () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    await component.ngOnInit();

    expect(component.ngbDate).toEqual(null as any);
  });

  it('should create and set ngbDate', async () => {
    component.control.setValue('2012-01-01');

    await fixture.detectChanges();
    await fixture.isStable();
    expect(component).toBeTruthy();

    await component.ngOnInit();
    expect(component.ngbDate).toEqual('2012-01-01' as any);

    component.clearDate();

    expect(component.ngbDate).toEqual(null as any);

    await component.onDateChange('2012-01-02' as any);
    expect(component.control.value).toEqual('2012-01-02' as any);
  });

  it('should validate dates', async () => {
    await fixture.detectChanges();
    await fixture.isStable();

    let date = new Date();
    expect(component.isValidDate({
        day: date.getUTCDate(),
        month: date.getUTCMonth() + 1,
        year: date.getUTCFullYear()
      })
    ).toBeTruthy();

    component.required = true;
    expect(component.isValidDate(null as any)).toEqual(null as any);

    component.required = false;
    expect(component.isValidDate(null as any)).toEqual(true);
  });

  it('should deal with changes', async () => {
    await fixture.detectChanges();
    await fixture.isStable();

    let minDateChanges = {
      minDate: {
        currentValue: '2012-01-01'
      }
    }
    await component.ngOnChanges(minDateChanges as any);
    expect(component.minNgbDate).toBeTruthy();

    let maxDateChanges = {
      maxDate: {
        currentValue: '2012-01-01'
      }
    }
    await component.ngOnChanges(maxDateChanges as any);
    expect(component.maxNgbDate).toBeTruthy();
  })
});
