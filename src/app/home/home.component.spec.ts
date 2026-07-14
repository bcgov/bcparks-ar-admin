import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';
import { NavCardModule } from '../shared/components/nav-card/nav-card.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAllowed'
  ]);
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [NavCardModule, RouterTestingModule],
      providers: [
        ConfigService,
        { provide: KeycloakService, useValue: mockKeycloakService }],
    }).compileComponents();
  });

  it('should create and have one card', () => {
    mockKeycloakService.isAllowed.and.returnValue(false);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.cardConfig.length).toBe(1);
  });

    it('should create and have five cards', () => {
    mockKeycloakService.isAllowed.and.returnValue(true);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.cardConfig.length).toBe(5);
  });
});
