import {
  sign as jwtSign,
  verify as jwtVerify,
} from 'jsonwebtoken';
import {
  IAuthConfig,
  IAuthetificator,
  IJwtPayloadData,
  signJWT,
  IToken,
  verifyJWT,
} from './types';
import JWTAuthetificator from './JWT';

export { IAuthConfig, IJwtPayloadData, signJWT, IToken, verifyJWT, IAuthetificator };
export default new JWTAuthetificator(jwtSign, jwtVerify);
