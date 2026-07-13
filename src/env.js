(function (window) {
    window.__env = window.__env || {};

    window.__env.logLevel = 0;

    // Get config from remote host?
    window.__env.configEndpoint = false;

    // Environment name
    window.__env.ENVIRONMENT = 'local';

    // API
    window.__env.API_LOCATION = 'http://localhost:3000';
    window.__env.API_PATH = '';
    window.__env.API_PUBLIC_PATH = '';

    // Keycloak
    window.__env.KEYCLOAK_CLIENT_ID = 'attendance-and-revenue';
    window.__env.KEYCLOAK_URL = 'https://dev.loginproxy.gov.bc.ca/auth';
    window.__env.KEYCLOAK_REALM = 'bcparks-service-transformation';
    window.__env.KEYCLOAK_ENABLED = true;
}(this));
