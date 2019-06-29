import * as jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
import config from '../../config';

const generateToken = (body: JSON): string => {
  const date = new Date();
  const jwtSecret = config.jwtSecret;
  const jti = md5(JSON.stringify(body));

  const payload = {
    jti,
    iss: 'ConsultaDocumento',
    sub: 'ACH',
    iat: date.getTime(),
  };
  return jsonwebtoken.sign(payload, jwtSecret, {
    algorithm: 'RS256',
    header: {
      typ: 'jwt',
    },
  });
};

export = {
  generateToken,
};
