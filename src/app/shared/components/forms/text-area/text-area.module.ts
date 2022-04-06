import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, FormsModule],
  exports: [TextAreaComponent],
})
export class TextAreaModule {}
