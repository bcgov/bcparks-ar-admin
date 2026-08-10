import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTextComponent } from './info-text.component';

@NgModule({
    imports: [CommonModule, InfoTextComponent],
    exports: [InfoTextComponent],
})
export class InfoTextModule {}
