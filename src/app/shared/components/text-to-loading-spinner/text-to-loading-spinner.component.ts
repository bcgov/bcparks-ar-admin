import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { takeWhile } from 'rxjs';
import { InfiniteLoadingBarService } from '../infinite-loading-bar/infinite-loading-bar.service';

@Component({
  selector: 'app-text-to-loading-spinner',
  templateUrl: './text-to-loading-spinner.component.html',
  styleUrls: ['./text-to-loading-spinner.component.scss'],
})
export class TextToLoadingSpinnerComponent implements OnDestroy {
  @Input() text;
  @Output() loadingStatus: EventEmitter<boolean> = new EventEmitter();

  private alive = true;
  private subscriptions: any[] = [];

  public fetchCount = 0;

  constructor(protected infiniteLoadingservice: InfiniteLoadingBarService) {
    this.subscriptions.push(
      infiniteLoadingservice
        .getFetchCount()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.fetchCount = res;
          if (this.fetchCount > 0) {
            this.loadingStatus.emit(true);
          } else {
            this.loadingStatus.emit(false);
          }
        })
    );
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
