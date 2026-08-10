import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AddSubareaComponent } from './add-subarea/add-subarea.component';
import { EditSubareaComponent } from './edit-subarea/edit-subarea.component';

@Component({
    selector: 'app-manage-subareas',
    templateUrl: './manage-subareas.component.html',
    styleUrls: ['./manage-subareas.component.scss'],
    imports: [AddSubareaComponent, EditSubareaComponent]
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
