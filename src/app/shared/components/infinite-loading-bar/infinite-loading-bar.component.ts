import { Component, OnDestroy } from '@angular/core';
import { Subscription, takeWhile } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-infinite-loading-bar',
  templateUrl: './infinite-loading-bar.component.html',
  styleUrls: ['./infinite-loading-bar.component.scss'],
})
export class InfiniteLoadingBarComponent implements OnDestroy {
  private alive = true;
  private subscriptions = new Subscription();

  public loading = false;

  constructor(protected loadingService: LoadingService) {
    this.subscriptions.add(
      loadingService
        .getLoadingStatus()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.loading = res;
        })
    );
  }

  ngOnDestroy() {
    this.alive = false;
    this.subscriptions.unsubscribe();
  }
}
