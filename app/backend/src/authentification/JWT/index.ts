import {
  sign as jwtSign,
  verify as jwtVerify,
} from 'jsonwebtoken';
import { AuthConfig, JwtPayloadData, signJWT, Token, verifyJWT } from './interfaces';
import JWTAuthetificator from './JWT';

export { AuthConfig, JwtPayloadData, signJWT, Token, verifyJWT };
export default new JWTAuthetificator(jwtSign, jwtVerify);
