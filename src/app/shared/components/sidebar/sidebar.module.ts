import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SideBarService } from 'src/app/services/sidebar.service';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule],
  exports: [SidebarComponent],
  providers: [SideBarService],
})
export class SidebarModule {}
