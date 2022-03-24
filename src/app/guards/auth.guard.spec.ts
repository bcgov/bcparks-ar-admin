import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular/lib/core/services/keycloak.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAuthenticated',
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

  it('should return true if the user is authenticated', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);

    const guard = TestBed.get(AuthGuard);

    const result = guard.canActivate();

    expect(result).toEqual(true);
  });

  it('should return redirect to unauthorized page if the user is not authenticated', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/unauthorized');
  });
});
