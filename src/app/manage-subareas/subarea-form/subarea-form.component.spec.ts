import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareaFormComponent } from './subarea-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

describe('SubareaFormComponent', () => {
  let component: SubareaFormComponent;
  let fixture: ComponentFixture<SubareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubareaFormComponent ],
      providers: [ HttpClient, HttpHandler, ConfigService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
