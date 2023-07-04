import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { JwtUtil } from '../shared/utils/jwt-utils';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';

declare let Keycloak: any;

@Injectable()
export class KeycloakService {
  public LAST_IDP_AUTHENTICATED = 'kc-last-idp-authenticated';
  private keycloakAuth: any;
  private keycloakEnabled: boolean;
  private keycloakUrl: string;
  private keycloakRealm: string;

  public readonly idpHintEnum = {
    BCEID: 'bceid',
    BCSC: 'bcsc',
    IDIR: 'idir',
  };

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
    private toastService: ToastService
  ) {}

  async init() {
    // Load up the config service data
    this.keycloakEnabled = this.configService.config['KEYCLOAK_ENABLED'];
    this.keycloakUrl = this.configService.config['KEYCLOAK_URL'];
    this.keycloakRealm = this.configService.config['KEYCLOAK_REALM'];

    if (this.keycloakEnabled) {
      // Bootup KC
      const keycloak_client_id =
        this.configService.config['KEYCLOAK_CLIENT_ID'];

      return new Promise<void>((resolve, reject) => {
        const config = {
          url: this.keycloakUrl,
          realm: this.keycloakRealm,
          clientId: !keycloak_client_id ? 'nrpti-admin' : keycloak_client_id,
        };

        this.loggerService.debug('KC Auth init.');

        this.keycloakAuth = new Keycloak(config);

        this.keycloakAuth.onAuthSuccess = () => {
          this.loggerService.debug('onAuthSuccess');
        };

        this.keycloakAuth.onAuthError = () => {
          this.loggerService.debug('onAuthError');
        };

        this.keycloakAuth.onAuthRefreshSuccess = () => {
          this.loggerService.debug('onAuthRefreshSuccess');
        };

        this.keycloakAuth.onAuthRefreshError = () => {
          this.loggerService.debug('onAuthRefreshError');
        };

        this.keycloakAuth.onAuthLogout = () => {
          this.loggerService.debug('onAuthLogout');
        };

        // Try to get refresh tokens in the background
        this.keycloakAuth.onTokenExpired = () => {
          this.keycloakAuth
            .updateToken()
            .then((refreshed) => {
              this.loggerService.log(`KC refreshed token?: ${refreshed}`);
            })
            .catch((err) => {
              this.loggerService.log(`KC refresh error: ${err}`);
            });
        };

        // Initialize.
        this.keycloakAuth
          .init({})
          .then((auth) => {
            this.loggerService.debug(`KC Refresh Success?:${this.keycloakAuth.authServerUrl}`);
            this.loggerService.log(`KC Success: ${auth}`);
            resolve();
          })
          .catch((err) => {
            this.toastService.addMessage(
              'Failed to initialize Keycloak.',
              'Keycloak Service',
              Constants.ToastTypes.ERROR
            );
            this.loggerService.log(`KC error: ${err}`);
            reject();
          });
      });
    }
  }

  /**
   * Check if the current user is logged in.
   *
   * @returns {boolean} true if the user is logged in.
   * @memberof KeycloakService
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.keycloakAuth && this.keycloakAuth.authenticated === true;
  }

  /**
   * Check if the current user is logged in and has admin access.
   *
   * @returns {boolean} true if the user has access, false otherwise.
   * @memberof KeycloakService
   */
  isAuthorized(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwt = JwtUtil.decodeToken(token);

    if (
      !(
        jwt &&
        jwt.resource_access &&
        jwt.resource_access['attendance-and-revenue'] &&
        jwt.resource_access['attendance-and-revenue'].roles
      )
    ) {
      return false;
    }

    return jwt.resource_access['attendance-and-revenue'].roles.length >= 1;
  }

  /**
   * Returns whether or not the user has sysadmin role
   *
   * @returns {boolean} User is a sysadmin.
   * @memberof KeycloakService
   */
  isAllowed(service): boolean {
    // admin only routes
    let adminOnlyRoutes = [
      'lock-records',
      'review-data',
    ]
    if (!adminOnlyRoutes.find(route => route === service)) {
      return true;
    }

    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwt = JwtUtil.decodeToken(token);
    return jwt?.resource_access?.['attendance-and-revenue']?.roles.includes(
      'sysadmin'
    );
  }

  /**
   * Returns the current keycloak auth token.
   *
   * @returns {string} keycloak auth token.
   * @memberof KeycloakService
   */
  getToken(): string {
    return this.keycloakAuth && this.keycloakAuth.token;
  }

  /**
   * Returns an observable that emits when the auth token has been refreshed.
   * Call {@link KeycloakService#getToken} to fetch the updated token.
   *
   * @returns {Observable<string>}
   * @memberof KeycloakService
   */
  refreshToken(): Observable<any> {
    return new Observable((observer) => {
      this.keycloakAuth
        .updateToken(30)
        .then((refreshed) => {
          this.loggerService.log(`KC refreshed token?: ${refreshed}`);
          observer.next();
          observer.complete();
        })
        .catch((err) => {
          this.loggerService.log(`KC refresh error: ${err}`);
          observer.error();
        });

      return { unsubscribe() {} };
    });
  }

  public getWelcomeMessage(): string {
    const token = this.getToken();

    if (!token) {
      return '';
    }

    const jwt = JwtUtil.decodeToken(token);

    if (!jwt || !jwt.name) {
      return '';
    }

    return `${jwt.name}`;
  }

  /**
   * Redirects to keycloak and logs in
   *
   * @param {string} idpHint see idpHintEnum for valid values
   * @memberof KeycloakService
   */
  login(idpHint: string) {
    let redirectUri = window.location.href;
    // by default keycloak login will want to redirect back to the login page
    // redirect to '/dayuse' instead
    if (redirectUri.endsWith('/login')) {
      redirectUri = redirectUri.slice(0, redirectUri.lastIndexOf('/'));
    }
    return (
      this.keycloakAuth &&
      this.keycloakAuth.login({ idpHint: idpHint, redirectUri: redirectUri })
    );
  }

  /**
   * Infers the identity provider from the JWT token
   *
   * @remarks
   * If IDIR and BCEID users are being redirected to the BCSC login
   * page to re-authenticate, it means the client mappers in Keycloak
   * (idir_userid and bceid_userid) haven't been properly setup.
   *
   * @memberof KeycloakService
   */
  getIdpFromToken(): string {
    const token = this.getToken();

    if (!token) {
      return '';
    }

    const jwt = JwtUtil.decodeToken(token);

    // idir users have an idir_userid property
    if (jwt.idir_userid !== undefined) {
      return this.idpHintEnum.IDIR;
    }

    // bceid users will have a bceid_userid property
    if (jwt.bceid_userid !== undefined) {
      return this.idpHintEnum.BCEID;
    }

    // BCSC users have no distinguishing traits, but BCSC is asssumed
    // if it's not BCeID or IDIR
    return this.idpHintEnum.BCSC;
  }
}
