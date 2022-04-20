import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { BaseFormComponent } from './base-form.component';
import { BaseFormModule } from './base-form.module';

describe('BaseFormComponent', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFormComponent],
      imports: [BaseFormModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
