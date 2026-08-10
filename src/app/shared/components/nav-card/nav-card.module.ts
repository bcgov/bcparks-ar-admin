import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCardComponent } from './nav-card.component';

@NgModule({
    imports: [CommonModule, NavCardComponent],
    exports: [NavCardComponent],
})
export class NavCardModule {}
