import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nav-card',
    templateUrl: './nav-card.component.html',
    styleUrls: ['./nav-card.component.scss']
})
export class NavCardComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() cardHeader;
  @Input() cardTitle;
  @Input() cardText;
  @Input() navigation;

  ngOnInit(): void {}

  navigate(nav) {
    this.router.navigate(['/' + nav]);
  }
}
