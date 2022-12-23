import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockConfigService = jasmine.createSpyObj('ConfigService', {}, { config: { ENVIRONMENT: 'prod'} });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: ConfigService, useValue: mockConfigService
        },
        KeycloakService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  it('should create and not show the banner', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(component.showBanner).toBe(false);
  });
});
