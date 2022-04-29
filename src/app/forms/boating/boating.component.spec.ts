import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { BaseFormModule } from 'src/app/shared/components/forms/base-form/base-form.module';
import { TextAreaModule } from 'src/app/shared/components/forms/text-area/text-area.module';
import { ParkHeaderModule } from '../park-header/park-header.module';

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
        RouterTestingModule,
        ParkHeaderModule,
      ],
      providers: [HttpClient, HttpHandler, ConfigService],
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
