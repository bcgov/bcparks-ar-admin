import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { OperatorFunction } from 'rxjs/internal/types';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TypeaheadComponent implements OnInit, OnDestroy {
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() set data(value: any[]) {
    if (this.control) {
      this.setControlValue(null);
    }
    this._data.next(value);
    if (this.control) {
      this.setControlValue(this.data ? this.data[0] : null);
    }
  }
  public get data() {
    return this._data.value;
  }
  @Input() placeholder = '';
  @Input() label: String = '';
  @Input() id: String = 'typeahead-focus';
  @Input() disabled: boolean = false;

  @Output() cleared: EventEmitter<any> = new EventEmitter();

  protected model;
  private subscriptions = new Subscription();

  public _data = new BehaviorSubject<any>({ value: null, display: null });

  @Output() output: EventEmitter<any> = new EventEmitter();

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {
    this.model = this.control?.value || null;
    this.subscriptions.add(
      this.control.valueChanges.subscribe((value) => {
        this.model = value;
      })
    );
  }

  isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  search: OperatorFunction<string, readonly { display; value; template }[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        term === ''
          ? this.data
          : this.data.filter(
              (v) => v.display.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
      )
    );
  };

  formatter = (x: { display; value; template }) => x.display;

  clear() {
    this.setControlValue(null);
    this.cleared.emit();
  }

  setControlValue(event) {
    if (event?.item) {
      this.control.setValue(event.item);
      this.model = event.item;
    } else {
      this.control.setValue(null);
      this.model = null;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
