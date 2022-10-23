import * as sinon from 'sinon';
import * as chai from 'chai';
import JWTAuth, { IAuthConfig, IJwtPayloadData, IToken } from '../authentification/JWT';

import { Response } from 'superagent';
import { sign, verify } from 'jsonwebtoken';
import { autoSecret } from '../authentification/JWT/JWT';
const bcrypt = require('bcryptjs')

const { expect } = chai;

interface testPayload {
  email: string;
  password: string;
}

describe('Testa o funcionamento do autenticador JWT.', () => {
  it('Testa a função de codificar.', () => {
    const JWT = JWTAuth;
    const payload: testPayload = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    }
    const secret: string = 'SuperSecret';
    const JWTConfig: IAuthConfig = { algorithm: 'HS256' };
    const tokenWithOptions: IToken = JWT.encode<testPayload>(payload, secret, JWTConfig);
    const tokenWithSecret: IToken = JWT.encode<testPayload>(payload, secret);
    const tokenAuto: IToken = JWT.encode<testPayload>(payload);
    expect(tokenWithOptions.token).not.to.be.deep.equal(payload);
    expect(tokenWithSecret.token).not.to.be.deep.equal(payload);
    expect(tokenAuto.token).not.to.be.deep.equal(payload);
    const decodedWithOptions = verify(tokenWithOptions.token, secret) as IJwtPayloadData<testPayload>;
    const decodedWithSecret = verify(tokenWithSecret.token, secret) as IJwtPayloadData<testPayload>;
    const decodedAuto = verify(tokenAuto.token, autoSecret) as IJwtPayloadData<testPayload>;
    const infoWithOptions: testPayload = decodedWithOptions.data;
    const infoWithSecret: testPayload = decodedWithSecret.data;
    const infoAuto: testPayload = decodedAuto.data;
    expect(infoWithOptions).to.be.deep.equal(payload);
    expect(infoWithSecret).to.be.deep.equal(payload);
    expect(infoAuto).to.be.deep.equal(payload);
  });
  it('Testa a função de decodificar.', () => {
    const JWT = JWTAuth;
    const payload: testPayload = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    }
    const secret: string = 'SuperSecret';
    const JWTConfig: IAuthConfig = { algorithm: 'HS256' };
    const tokenWithSecret: string = sign({ data: { ...payload } }, secret, JWTConfig);
    const tokenAuto : string = sign({ data: { ...payload } }, autoSecret, JWTConfig);
    const decodedWithSecret: testPayload = JWT.decode<testPayload>(tokenWithSecret, secret);
    const decodedAuto: testPayload = JWT.decode<testPayload>(tokenAuto);
    expect(decodedWithSecret).to.be.deep.equal(payload);
    expect(decodedAuto).to.be.deep.equal(payload);
  });
});