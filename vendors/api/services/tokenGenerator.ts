import * as fs from 'fs';
import * as jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
import config from '../../config';
import loggin from '../../logger';

const generateToken = (body: any): string => {
  try {
    const date = new Date();
    const jwtSecret = fs.readFileSync(config.jwtSecret, 'utf8');
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
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

export = {
  generateToken,
};
