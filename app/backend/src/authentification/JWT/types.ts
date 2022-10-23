import { Jwt, JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface IAuthConfig {
  [key: string]: string;
}

export interface IToken {
  token: string;
}

export interface IJwtPayloadData<T> extends JwtPayload {
  data: T;
}

export type verifyResponse = Jwt | JwtPayload | string;

export type signJWT = (payload: JwtPayload, secret: Secret, options?: SignOptions) => string;

export type verifyJWT = (token: string, secret: Secret, options?: VerifyOptions) => verifyResponse;

export interface IAuthetificator {
  encode<T>(payload: T, secretOption?: Secret, paramsConfig?: IAuthConfig): IToken;
  decode<T>(token: string, secretOption?: Secret):T;
}
