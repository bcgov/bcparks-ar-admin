import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenteredTextBlockComponent } from './centered-text-block.component';

@NgModule({
    imports: [CommonModule, CenteredTextBlockComponent],
    exports: [CenteredTextBlockComponent],
})
export class CenteredTextBlockModule {}
