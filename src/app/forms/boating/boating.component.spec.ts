import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseFormModule } from 'src/app/shared/components/forms/base-form/base-form.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';

import { BoatingComponent } from './boating.component';
import { BoatingSectionModule } from './sections/boating-section/boating-section.module';

describe('BoatingComponent', () => {
  let component: BoatingComponent;
  let fixture: ComponentFixture<BoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatingComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BaseFormModule,
        BoatingSectionModule,
        TextAreaModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
