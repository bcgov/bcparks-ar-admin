import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubareaComponent } from './edit-subarea.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

describe('EditSubareaComponent', () => {
  let component: EditSubareaComponent;
  let fixture: ComponentFixture<EditSubareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSubareaComponent],
      providers: [HttpClient, HttpHandler, ConfigService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditSubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
