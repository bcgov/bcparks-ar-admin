import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { DayUseComponent } from './day-use.component';
import { DayUseModule } from './day-use.module';

describe('DayUseComponent', () => {
  let component: DayUseComponent;
  let fixture: ComponentFixture<DayUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayUseComponent],
      imports: [DayUseModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
