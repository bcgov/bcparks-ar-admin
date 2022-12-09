(function (window) {
    window.__env = window.__env || {};

    window.__env.logLevel = 0;

    // Get config from remote host?
    window.__env.configEndpoint = false;

    // Environment name
    window.__env.ENVIRONMENT = 'local';

    // API
    window.__env.API_LOCATION = 'http://localhost:3000';
    window.__env.API_PATH = '/api';
    window.__env.API_PUBLIC_PATH = '/api';

    // Keycloak
    window.__env.KEYCLOAK_CLIENT_ID = 'attendance-and-revenue';
    window.__env.KEYCLOAK_URL = 'https://dev.oidc.gov.bc.ca/auth';
    window.__env.KEYCLOAK_REALM = 'g7v0xlf4';
    window.__env.KEYCLOAK_ENABLED = true;
}(this));