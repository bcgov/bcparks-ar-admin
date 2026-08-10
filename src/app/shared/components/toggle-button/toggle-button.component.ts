import { Component, inject } from '@angular/core';
import { SideBarService } from 'src/app/services/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.scss'],
    imports: [NgClass]
})
export class ToggleButtonComponent {
  private sidebarService = inject(SideBarService);

  public loading = true;
  public closed = false;

  toggleSideNav() {
    this.sidebarService.toggle();
    this.closed = this.sidebarService.hide;
  }
}
