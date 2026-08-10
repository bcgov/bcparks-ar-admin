import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSubareasComponent } from './manage-subareas.component';
import { AddSubareaComponent } from './add-subarea/add-subarea.component';
import { EditSubareaComponent } from './edit-subarea/edit-subarea.component';
import { FormsModule } from '@angular/forms';
import { NgdsFormsModule } from '@digitalspace/ngds-forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { SubareaFormComponent } from './subarea-form/subarea-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgdsFormsModule,
        ModalModule,
        ManageSubareasComponent,
        AddSubareaComponent,
        EditSubareaComponent,
        ReviewModalComponent,
        SubareaFormComponent
    ],
    exports: [
        ReviewModalComponent,
        SubareaFormComponent
    ]
})

export class ManageSubareasModule { }
