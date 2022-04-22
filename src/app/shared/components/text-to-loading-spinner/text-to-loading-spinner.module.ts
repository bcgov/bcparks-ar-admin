import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToLoadingSpinnerComponent } from './text-to-loading-spinner.component';
import { InfiniteLoadingBarService } from '../infinite-loading-bar/infinite-loading-bar.service';

@NgModule({
  declarations: [TextToLoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [TextToLoadingSpinnerComponent],
  providers: [InfiniteLoadingBarService],
})
export class TextToLoadingSpinnerModule {}
