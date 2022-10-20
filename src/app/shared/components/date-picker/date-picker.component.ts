import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { Utils } from '../../utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() control: UntypedFormControl;
  @Input() isValidate = false;
  @Input() isDisabled = false;
  @Input() minDate: Date = null as any;
  @Input() maxDate: Date = null as any;
  @Input() reset: EventEmitter<any>;
  @Input() required = false;

  private subscriptions = new Subscription();

  public ngbDate: NgbDateStruct = null as any;
  public minNgbDate: NgbDateStruct = null as any;
  public maxNgbDate: NgbDateStruct = null as any;

  public loading = true;

  private utils = new Utils();

  constructor(private _changeDetectionRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] && changes['minDate'].currentValue) {
      this.minNgbDate = this.utils.convertJSDateToNGBDate(
        new Date(changes['minDate'].currentValue)
      ) as any;
    }
    if (changes['maxDate'] && changes['maxDate'].currentValue) {
      this.maxNgbDate = this.utils.convertJSDateToNGBDate(
        new Date(changes['maxDate'].currentValue)
      ) as any;
    }

    this.loading = false;
    this._changeDetectionRef.detectChanges();
  }

  ngOnInit() {
    this.ngbDate = this.control.value || null;
    if (this.reset) {
      this.subscriptions.add(this.reset.subscribe(() => this.clearDate()));
    }
  }

  onDateChange(ngbDate: NgbDateStruct) {
    this.control.setValue(ngbDate);
    this.control.markAsDirty();
  }

  clearDate() {
    this.ngbDate = null as any;
    this.control.setValue(null);
    this.control.markAsDirty();
  }

  public isValidDate(date: NgbDateStruct): boolean {
    if (date === null && !this.required) {
      return true;
    } else {
      return (
        date && !isNaN(date.year) && !isNaN(date.month) && !isNaN(date.day)
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
