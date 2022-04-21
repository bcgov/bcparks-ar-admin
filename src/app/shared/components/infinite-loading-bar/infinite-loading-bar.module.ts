import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteLoadingBarComponent } from './infinite-loading-bar.component';

@NgModule({
  declarations: [InfiniteLoadingBarComponent],
  imports: [CommonModule],
  exports: [InfiniteLoadingBarComponent],
})
export class InfiniteLoadingBarModule {}
