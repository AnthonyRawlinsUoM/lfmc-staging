interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  REDIRECT: string;
  AUDIENCE: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_DOMAIN: 'bnhcrclfmc.au.auth0.com',
  CLIENT_ID: '5pP2Zg470UaUpF44jIdX6Peo2OWuWElX',
  REDIRECT: 'http://lfmc.landfood.unimelb.edu.au:3000/callback',
  AUDIENCE: 'http://lfmc.landfood.unimelb.edu.au:3000/',
  SCOPE: 'openid profile email'
};

