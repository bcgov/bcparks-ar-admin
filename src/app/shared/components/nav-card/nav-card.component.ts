import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nav-card',
    templateUrl: './nav-card.component.html',
    styleUrls: ['./nav-card.component.scss'],
    standalone: false
})
export class NavCardComponent implements OnInit {
  @Input() cardHeader;
  @Input() cardTitle;
  @Input() cardText;
  @Input() navigation;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  navigate(nav) {
    this.router.navigate(['/' + nav]);
  }
}
