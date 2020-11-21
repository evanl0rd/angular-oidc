import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    skipIssuerCheck: false,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin + '/login',
    scope: 'openid email',
    showDebugInformation: false,
    timeoutFactor: 0.9
}