import { Jwt, JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface AuthConfig {
  [key: string]: string;
}

export interface Token {
  token: string;
}

export interface JwtPayloadData<T> extends JwtPayload {
  data: T;
}

export type verifyResponse = Jwt | JwtPayload | string;
export type signJWT = (payload: JwtPayload, secret: Secret, options?: SignOptions) => string;
export type verifyJWT = (token: string, secret: Secret, options?: VerifyOptions) => verifyResponse;
export interface JWTAuthetificator {
  sign: signJWT;
  verify: verifyJWT;
  encode: <T>(payload: T) => Token;
  decode: <T>(token: string) => T;
}
