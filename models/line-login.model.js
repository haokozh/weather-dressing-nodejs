const crypto = require('crypto');
const Promise = require('bluebird');
const axios = require('axios');
const qs = require('qs');

Promise.promisifyAll(axios);

class LineLogin {
  constructor(opts) {
    const required_params = ['channel_id', 'channel_secret', 'callback_url'];
    required_params.map((params) => {
      if (!opts[params]) {
        throw new Error(`${params} missing.`);
      }
    });

    this.channel_id = opts.channel_id;
    this.channel_secret = opts.channel_secret;
    this.callback_url = opts.callback_url;
    this.scope = opts.scope || 'profile openid';
    this.prompt = opts.prompt;
    this.bot_prompt = opts.bot_prompt || 'normal';
    this.baseURL = 'https://access.line.me/oauth2/';
  }

  authDirect() {
    return (req, res) => {
      const state = LineLogin._random();
      const nonce = LineLogin._random();

      req.session.line_login_state = state;
      req.session.line_login_nonce = nonce;
      const url = this.secure_auth_url(state, nonce);

      return res.redirect(url);
    };
  }

  secure_auth_url(state, nonce) {
    const client_id = encodeURIComponent(this.channel_id);
    const redirect_uri = encodeURIComponent(this.callback_url);
    const scope = encodeURIComponent(this.scope);
    const bot_prompt = encodeURIComponent(this.bot_prompt);

    let url =
      `${this.baseURL}v2.1/authorize?response_type=code&` +
      `client_id=${client_id}&redirect_uri=${redirect_uri}` +
      `&scope=${scope}&bot_prompt=${bot_prompt}&state=${state}`;

    if (this.prompt) url += `&prompt=${encodeURIComponent(this.prompt)}`;
    if (nonce) url += `&nonce=${encodeURIComponent(nonce)}`;

    return url;
  }

  authcb(succ, fail) {
    return (req, res, next) => {
      const { code } = req.query;
      const { state } = req.query;
      if (req.session.line_login_state !== state) {
        return fail(
          req,
          res,
          next,
          new Error('Authorization failed. State does not match')
        );
      }

      this.issue_line_access_token(code)
        .then((token_response) => {
          if (token_response.id_token) {
            let decoded_id_token;
            try {
              decoded_id_token = jwt.verify(
                token_response.id_token,
                this.channel_secret,
                {
                  audience: this.channel_id,
                  issuer: 'https://access.line.me',
                  algorithms: ['HS256'],
                }
              );

              if (decoded_id_token.nonce !== req.session.line_login_nonce) {
                throw new Error('nonce not match.');
              }

              token_response.id_token = decoded_id_token;
            } catch (exception) {
              fail(new Error('Verification of id token failed.'));
            }
          }

          delete req.session.line_login_state;
          delete req.session.line_login_nonce;
          succ(req, res, token_response);
        })
        .catch((error) => {
          fail(req, res, next, error);
        });
    };
  }

  issue_line_access_token(code) {
    const url = 'https://api.line.me/oauth2/v2.1/token';
    const form = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.callback_url,
      client_id: this.channel_id,
      client_secret: this.channel_secret,
    };

    return axios
      .post(url, qs.stringify(form), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        return res.data;
      });
  }

  static _random() {
    return crypto.randomBytes(20).toString('hex');
  }
}

module.exports = LineLogin;
