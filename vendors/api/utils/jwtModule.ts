import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import md5 from 'md5';
import config from '../../config';
import loggin from '../../logger';

const jwtSecretKey = fs.readFileSync(config.jwtSecretKey, 'utf8');
const jwtPublicKey = fs.readFileSync(config.jwtPublicKey, 'utf8');
const iss = 'ConsultaDocumento';
const sub = 'ACHS';
const algorithm = 'RS256';

const sign = (body: any): string => {
  try {
    const date = new Date();
    const jti = md5(JSON.stringify(body));

    const payload = {
      jti,
      iss,
      sub,
      iat: date.getTime(),
    };
    return jwt.sign(payload, jwtSecretKey, {
      algorithm,
      header: {
        typ: 'jwt',
      },
    });
  } catch (error) {
    loggin.error(error);
    return error;
  }
};

const verify = (token: string, options: any) => {
  try {
    return jwt.verify(token, jwtPublicKey);
  } catch (error) {
    loggin.error(error);
    return false;
  }
};

const decode = (token: string) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    loggin.error(error);
    return false;
  }
};

export = {
  sign,
  verify,
  decode,
};
