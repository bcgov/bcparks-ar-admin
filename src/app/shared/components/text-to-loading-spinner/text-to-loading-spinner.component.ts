import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-text-to-loading-spinner',
    templateUrl: './text-to-loading-spinner.component.html',
    styleUrls: ['./text-to-loading-spinner.component.scss']
})
export class TextToLoadingSpinnerComponent implements OnInit, OnDestroy {
  protected loadingService = inject(LoadingService);
  protected cdr = inject(ChangeDetectorRef);

  @Input() text;
  @Output() loadingStatus: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();

  public _loading = new BehaviorSubject<boolean>(false);

  get loading() {
    return this._loading.value
  }
  set loading(value) {
    this._loading.next(value);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
        this.loadingStatus.emit(res);
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
