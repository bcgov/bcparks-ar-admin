import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteLoadingBarComponent } from './infinite-loading-bar.component';

@NgModule({
    imports: [CommonModule, InfiniteLoadingBarComponent],
    exports: [InfiniteLoadingBarComponent],
})
export class InfiniteLoadingBarModule {}
