import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage-subareas',
  templateUrl: './manage-subareas.component.html',
  styleUrls: ['./manage-subareas.component.scss'],
})

export class ManageSubareasComponent {
  public _activeTab = new BehaviorSubject<string>(null);

  constructor() {
    this._activeTab.next('add');
  }

  changeActiveTab(tab: string) {
    this._activeTab.next(tab);
  }

  public form = new UntypedFormGroup({

  })

}
