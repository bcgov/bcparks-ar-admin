import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from '../services/keycloak.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAuthenticated',
    'isAuthorized',
    'isAllowed',
    'getIdpFromToken',
    'login',
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [RouterTestingModule],
    });
  });

  afterEach(() => {
    mockRouter.parseUrl.and.stub();
    mockKeycloakService.isAuthenticated.and.stub();
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return false if the user is authenticated but has no roles', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.isAllowed.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);

    const result = guard.canActivate(null, {url: '/export-reports'});

    expect(result).toEqual(undefined);
  });

  it('should return redirect to login page if the user is not authenticated and sessionStorage does not contain an idp value', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(false);

    spyOn(window.sessionStorage, 'getItem').and.callFake(() => {
      return null;
    });

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('should return redirect to login page if the user is not authenticated and sessionStorage contains an idp value', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(false);

    spyOn(window.sessionStorage, 'getItem').and.callFake(() => {
      return 'idir';
    });

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(mockKeycloakService.login).toHaveBeenCalled();
  });

  it('should return redirect to unauthorized page if the user is not authorized', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/unauthorized');
  });
});
