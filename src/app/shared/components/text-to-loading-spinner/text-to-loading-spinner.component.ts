import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { takeWhile } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

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

  constructor(protected loadingService: LoadingService) {
    this.subscriptions.push(
      loadingService
        .getFetchCount()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.fetchCount = Object.keys(res).length;
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
