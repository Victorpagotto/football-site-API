import { config } from 'dotenv';
import { Secret } from 'jsonwebtoken';
import {
  IAuthConfig,
  IAuthetificator,
  IJwtPayloadData,
  signJWT,
  IToken,
  verifyJWT,
} from './types';

config();

export const autoSecret = 'jwt_secret';

export default class JWTAuthetificator implements IAuthetificator {
  private _sign: signJWT;

  private _verify: verifyJWT;

  constructor(sign: signJWT, verify: verifyJWT) {
    this._sign = sign;
    this._verify = verify;
  }

  public encode<T>(payload: T, secretOption?: Secret, paramsConfig?: IAuthConfig): IToken {
    const JWTConfig: IAuthConfig = paramsConfig || { expiresIn: '1d', algorithm: 'HS256' };
    const secret: string | Secret = secretOption || autoSecret;
    const token: string = this._sign({ data: { ...payload } }, secret, JWTConfig);
    return { token };
  }

  public decode<T>(token: string, secretOption?: Secret):T {
    const secret: string | Secret = secretOption || autoSecret;
    const decoded = this._verify(token, secret) as IJwtPayloadData<T>;
    const info: T = decoded.data;
    return info;
  }
}
