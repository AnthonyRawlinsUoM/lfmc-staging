interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  REDIRECT: string;
  AUDIENCE: string;
  SCOPE: string;
  RESPONSE_TYPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  // CLIENT_DOMAIN: 'bnhcrclfmc.au.auth0.com',
  // CLIENT_ID: '5pP2Zg470UaUpF44jIdX6Peo2OWuWElX',
  // REDIRECT: 'http://lfmc.landfood.unimelb.edu.au:3000/callback',
  // AUDIENCE: 'http://lfmc.landfood.unimelb.edu.au:3000/profile',
  // SCOPE: 'openid profile email',
  // RESPONSE_TYPE: 'token id_token',
  CLIENT_ID: '5pP2Zg470UaUpF44jIdX6Peo2OWuWElX',
  CLIENT_DOMAIN: 'bnhcrclfmc.au.auth0.com',
  RESPONSE_TYPE: 'token id_token',
  AUDIENCE: 'https://bnhcrclfmc.au.auth0.com/userinfo',
  // REDIRECT: 'http://128.250.160.167:3000/callback',
  // REDIRECT: 'http://128.250.160.167:4200/callback',
  REDIRECT: 'http://landscapefuelmoisture.bushfirebehaviour.net.au/callback',
  SCOPE: 'openid profile'
};

