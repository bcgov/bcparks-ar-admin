import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() label: String = '';
  @Input() id: String = 'select';
  @Input() disabled: boolean = false;
  @Input() model;

  @Output() output: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emit(event) {
    this.output.emit(event);
  }
}
