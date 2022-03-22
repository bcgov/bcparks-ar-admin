import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { SideBarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @HostBinding('class.is-toggled')
  public hide = false;

  public alive = true;

  constructor(private sideBarService: SideBarService) {}

  ngOnInit(): void {
    this.sideBarService.toggleChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((hide) => {
        this.hide = hide;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
