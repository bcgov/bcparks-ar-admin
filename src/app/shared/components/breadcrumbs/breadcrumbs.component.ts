import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  // TODO: Have this be set by a service
  public toggleButtonExists = true;
  constructor() {}

  ngOnInit(): void {}
}
