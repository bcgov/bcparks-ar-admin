import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-text-to-loading-spinner',
  templateUrl: './text-to-loading-spinner.component.html',
  styleUrls: ['./text-to-loading-spinner.component.scss'],
})
export class TextToLoadingSpinnerComponent implements OnDestroy {
  @Input() text;
  @Output() loadingStatus: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();

  public loading = false;

  constructor(protected loadingService: LoadingService) {
    this.subscriptions.add(
      loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
        this.loadingStatus.emit(res);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
