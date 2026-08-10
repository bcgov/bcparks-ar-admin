import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavCardModule } from '../shared/components/nav-card/nav-card.module';

@NgModule({
    imports: [CommonModule, NavCardModule, HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
