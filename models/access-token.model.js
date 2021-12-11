class AccessToken {
  constructor(scope, accessToken, tokenType, expiresIn, refreshToken, idToken) {
    this.scope = scope;
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.idToken = idToken;
  }
}

module.exports = AccessToken;