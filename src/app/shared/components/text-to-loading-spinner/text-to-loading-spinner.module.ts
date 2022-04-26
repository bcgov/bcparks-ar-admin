import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextToLoadingSpinnerComponent } from './text-to-loading-spinner.component';
import { LoadingService } from 'src/app/services/loading.service';

@NgModule({
  declarations: [TextToLoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [TextToLoadingSpinnerComponent],
  providers: [LoadingService],
})
export class TextToLoadingSpinnerModule {}
