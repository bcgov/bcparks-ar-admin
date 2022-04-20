import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { FrontcountryCabinsComponent } from './frontcountry-cabins.component';
import { FrontcountryCabinsModule } from './frontcountry-cabins.module';

describe('FrontcountryCabinsComponent', () => {
  let component: FrontcountryCabinsComponent;
  let fixture: ComponentFixture<FrontcountryCabinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontcountryCabinsComponent],
      imports: [FrontcountryCabinsModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
