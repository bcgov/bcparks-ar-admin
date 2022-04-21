import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { InfiniteLoadingBarService } from './infinite-loading-bar.service';

@Component({
  selector: 'app-infinite-loading-bar',
  templateUrl: './infinite-loading-bar.component.html',
  styleUrls: ['./infinite-loading-bar.component.scss'],
})
export class InfiniteLoadingBarComponent implements OnDestroy {
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
