import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from '../services/config.service';
import { KeycloakService } from '../services/keycloak.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

describe('LoginComponent', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAllowed',
    'isAuthenticated',
    'isAuthorized',
    'login'
  ]);
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockRoutes = [
    { path: 'unauthorized', component: LoginComponent, data: { icon: 'bi-circle' } },
    { path: '', component: HomeComponent, data: { icon: 'bi-circle' } }
  ];

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes)],
      declarations: [LoginComponent],
      providers: [
        ConfigService,
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();
  });

  it('should handle login', async () => {
    mockKeycloakService.isAllowed.and.returnValue(true);
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    await fixture.isStable();
    fixture.detectChanges();
    expect(component).toBeTruthy();

    component.handleLogin('idir');
    expect(mockKeycloakService.login).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle not logged in', async () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    await fixture.isStable();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
