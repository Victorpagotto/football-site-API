import { config } from 'dotenv';
import { AuthConfig, JwtPayloadData, signJWT, Token, verifyJWT } from './interfaces';

config();

export default class JWTAuthetificator implements JWTAuthetificator {
  sign: signJWT;

  verify: verifyJWT;

  constructor(sign: signJWT, verify: verifyJWT) {
    this.sign = sign;
    this.verify = verify;
  }

  encode<T>(payload: T): Token {
    const JWTConfig: AuthConfig = { expiresIn: '1d', algorithm: 'HS256' };
    const secret: string = process.env.SECRET || 'randomword';
    const token: string = this.sign({ data: payload }, secret, JWTConfig);
    return { token };
  }

  decode<T>(token: string):T {
    const secret: string = process.env.SECRET || 'randomword';
    const decoded = this.verify(token, secret) as JwtPayloadData<T>;
    const info: T = decoded.data;
    return info;
  }
}
