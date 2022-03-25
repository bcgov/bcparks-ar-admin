(function (window) {
    window.__env = window.__env || {};

    // Ideally in our app we have a wrapper around our logger class in the angular front ends to
    // turn on/off the console.log's
    window.__env.debugMode = true;

    // Get config from remote host?
    window.__env.configEndpoint = false;

    // Environment name
    window.__env.ENVIRONMENT = 'local';

    // API
    window.__env.API_LOCATION = 'https://l267fuit1b.execute-api.ca-central-1.amazonaws.com';
    window.__env.API_PATH = '/api';
    window.__env.API_PUBLIC_PATH = '/api';

    // Keycloak
    window.__env.KEYCLOAK_CLIENT_ID = 'parking-pass';
    window.__env.KEYCLOAK_URL = 'https://oidc.gov.bc.ca/auth';
    window.__env.KEYCLOAK_REALM = 'g7v0xlf4';
    window.__env.KEYCLOAK_ENABLED = true;
}(this));
