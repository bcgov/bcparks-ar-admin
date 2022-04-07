import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenteredTextBlockComponent } from './centered-text-block.component';

@NgModule({
  declarations: [CenteredTextBlockComponent],
  imports: [CommonModule],
  exports: [CenteredTextBlockComponent],
})
export class CenteredTextBlockModule {}
