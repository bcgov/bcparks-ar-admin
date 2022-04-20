import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { FrontcountryCampingComponent } from './frontcountry-camping.component';
import { FrontcountryCampingModule } from './frontcountry-camping.module';

describe('FrontcountryCampingComponent', () => {
  let component: FrontcountryCampingComponent;
  let fixture: ComponentFixture<FrontcountryCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontcountryCampingComponent],
      imports: [FrontcountryCampingModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
