import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceAccordionComponent } from './variance-accordion.component';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'src/app/services/keycloak.service';

describe('VarianceAccordionComponent', () => {
  let component: VarianceAccordionComponent;
  let fixture: ComponentFixture<VarianceAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarianceAccordionComponent ],
      providers: [
        ConfigService,
        HttpClient,
        HttpHandler,
        KeycloakService 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarianceAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
