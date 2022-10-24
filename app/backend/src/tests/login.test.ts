import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import JWTAuthetificator from '../authentification/JWT';
import { IToken } from '../authentification/JWT';
import { ILoginInfo } from '../validation/user/types';
import User from '../database/models/usersModel';
import loginMock from './Mocks/Login';
import userList from './Mocks/Login/Users';
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de login..',() => {
  describe('conexão post', () => {
    beforeEach(() => {
      sinon
        .stub(JWTAuthetificator, "encode")
        .returns({
          token: loginMock.JWTHash,
        } as IToken);
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.user as ILoginInfo);
      sinon
        .stub(User, 'findOne')
        .resolves({
          ...userList.admin.validAdmin,
      } as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Email não existe.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
      const response: Response = await chai
          .request(app)
          .post('/login')
          .send(loginMock.incorrect.noEmail);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal(loginMock.messages.noEmail);
    });
    it('Senha não existe.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
      const response: Response = await chai
          .request(app)
          .post('/login')
          .send(loginMock.incorrect.noPassword);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal(loginMock.messages.noPassword);
    });
    it('Senha é inválida.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
      const response: Response = await chai
          .request(app)
          .post('/login')
          .send(loginMock.incorrect.invalidPassword);
        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal(loginMock.messages.invalidPassword);
    });
    it('Email é inválido.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
      const response: Response = await chai
          .request(app)
          .post('/login')
          .send(loginMock.incorrect.invalidEmail);
        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal(loginMock.messages.invalidEmail);
    });
    it('Senha está errada.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(false);
      const response: Response = await chai
          .request(app)
          .post('/login')
          .send(loginMock.incorrect.wrongPassword);
        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal(loginMock.messages.wrongPassword);
    });
    it('Testa o retorno correto de uma requisição.', async (): Promise<void> => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
      const response: Response = await chai
        .request(app)
        .post('/login')
        .send(loginMock.correct.user);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(loginMock.correctResponse.user);
    });
  });
  describe('Conexão get', () => {
    beforeEach(async () => {
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Token é inválido.', async (): Promise<void> => {
      sinon
        .stub(JWTAuthetificator, "encode")
        .returns({
        token: 'Pegadinha do malandro.',
      } as IToken);
      sinon
        .stub(User, "findOne")
        .resolves({
        ...userList.admin.validAdmin,
      } as any);
      const response: Response = await chai
        .request(app)
        .get('/login/validate')
        .auth(loginMock.JWTHash, { type: 'bearer' });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal(loginMock.messages.wrongToken);
    });
    it('Usuário não existe ou não é encontrado.', async (): Promise<void> => {
      sinon
        .stub(JWTAuthetificator, "encode")
        .returns({
        token: 'Pegadinha do malandro.',
      } as IToken);
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.user as ILoginInfo);
      sinon
        .stub(User, "findOne")
        .resolves(null);
      const response: Response = await chai
        .request(app)
        .get('/login/validate')
        .auth(loginMock.JWTHash, { type: 'bearer' });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal(loginMock.messages.userNotFound);
    });
    it('A role é retornada corretamente', async (): Promise<void> => {
      sinon
        .stub(JWTAuthetificator, "encode")
        .returns({
        token: 'Pegadinha do malandro.',
      } as IToken);
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.user as ILoginInfo);
      sinon
        .stub(User, "findOne")
        .resolves({
        ...userList.admin.validAdmin,
      } as any);
      const response: Response = await chai
        .request(app)
        .get('/login/validate')
        .auth(loginMock.JWTHash, { type: 'bearer' });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(loginMock.correctResponse.role);
    });
  });
});
