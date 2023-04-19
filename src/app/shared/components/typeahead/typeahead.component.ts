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
import { UntypedFormControl } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
  @Input() data: any[] = [];
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() placeholder = '';
  @Input() label: String = '';
  @Input() id: String = 'typeahead-focus';
  @Input() disabled: boolean = false;

  protected model;
  private subscriptions = new Subscription();

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
      (term === ''
        ? this.data
        : this.data.filter(
          (v) => v.display.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
      )
      )
    );
  };

  formatter = (x: { display; value; template }) => x.display;

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
