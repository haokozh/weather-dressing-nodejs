class IdToken {
  constructor(iss, sub, aud, exp, iat, nonce, name, picture) {
    this.iss = iss;
    this.sub = sub;
    this.aud = aud;
    this.exp = exp;
    this.iat = iat;
    this.nonce = nonce;
    this.name = name;
    this.picture = picture;
  }
}

module.exports = IdToken;
