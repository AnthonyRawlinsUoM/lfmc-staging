interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  domain: 'bnhcrclfmc.au.auth0.com',
  clientID: '5pP2Zg470UaUpF44jIdX6Peo2OWuWElX',
  callbackURL: 'http://localhost:4200/callback'
};
