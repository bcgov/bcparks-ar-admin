import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { summarySection } from './summary-section/summary-section.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() id: string = '';
  @Input() secondaryText: string = '';
  @Input() notes: string = '';
  @Input() summaries: Array<summarySection> = [];
  @Input() editLink: string = '';

  public readonly iconSize = 50; // icon size in px

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  edit() {
    this.router.navigate([this.editLink], { relativeTo: this.activatedRoute });
  }
}
