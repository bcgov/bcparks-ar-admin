import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-infinite-loading-bar',
    templateUrl: './infinite-loading-bar.component.html',
    styleUrls: ['./infinite-loading-bar.component.scss']
})
export class InfiniteLoadingBarComponent implements OnDestroy {
  protected loadingService = inject(LoadingService);

  private subscriptions = new Subscription();

  public loading = false;

  constructor() {
    const loadingService = this.loadingService;

    this.subscriptions.add(
      loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
