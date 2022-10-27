import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/matchesModel';
import matchesMock from './Mocks/Matches';
import matchesList from './Mocks/Matches/matches';

import { Response } from 'superagent';
import { ILoginInfo } from '../validation/user/types';

import JWTAuthetificator from '../authentification/JWT';
import loginMock from './Mocks/Login';
import teams from './Mocks/Teams/teams';
import usersList from './Mocks/Login/Users'
import Team from '../database/models/teamsModel';
import { IUserSession } from '../services/users/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de matches.',() => {
  describe('Testa rotas get.', () => {
    beforeEach(() => {
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.userSession as IUserSession);
      sinon
        .stub(Team, 'findAll')
        .resolves([...teams] as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Testa o retorno correto de partidas.', async (): Promise<void> => {
      sinon
        .stub(Match, 'findAll')
        .resolves([...matchesMock.correct.matches] as any);
      const response: Response = await chai
          .request(app)
          .get('/matches');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...matchesMock.correct.matches]);
    });
    it('Testa o retorno correto de partidas em progresso.', async (): Promise<void> => {
      sinon
        .stub(Match, 'findAll')
        .resolves([...matchesMock.correct.inProgress] as any);
      const response: Response = await chai
          .request(app)
          .get('/matches?inProgress=true');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...matchesMock.correct.inProgress]);
    });
    it('Testa o retorno correto de partidas finalizadas.', async (): Promise<void> => {
      sinon
        .stub(Match, 'findAll')
        .resolves([...matchesMock.correct.finished] as any);
      const response: Response = await chai
          .request(app)
          .get('/matches?inProgress=false');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...matchesMock.correct.finished]);
    });
  });
  describe('Testa rotas post.', () => {
    beforeEach(() => {
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.userSession as IUserSession);
      sinon
        .stub(Team, 'findAll')
        .resolves([...teams] as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Testa a criação de uma partida com sucesso.', async (): Promise<void> => {
      sinon
        .stub(Match, 'create')
        .resolves({ ...matchesMock.create.return.correct.dataValues } as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.correct });
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.correct.dataValues });
    });
    it('Testa se nãa é possível criar partidas sem o time da casa.', async () => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.noHome });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.noHome });
    });
    it('Testa se nãa é possível criar partidas sem o time de fora.', async () => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.noAway });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.noAway });
    });
    it('Testa se nãa é possível criar partidas sem os goals do time de casa.', async () => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.noHomeGoals });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.noHomeGoals });
    });
    it('Testa se nãa é possível criar partidas sem os goals do time de fora.', async () => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.noAwayGoals });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.noAwayGoals });
    });
    it('Testa se não é possível criar partidas com times iguais.', async (): Promise<void> => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.sameTeam });
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.sameTeam });
    });
    it('Testa se não é possível criar partidas com times inexistentes.', async (): Promise<void> => {
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.ghostTeam });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.ghostTeam });
    });
    it('Testa se não é possível criar partidas com token inválido.', async (): Promise<void> => {
      sinon.restore();
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      sinon
        .stub(Match, 'findAll')
        .resolves([...teams] as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .auth(matchesMock.create.insert.invalidToken.token, { type: 'bearer' })
          .send({ ...matchesMock.create.insert.correct });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.invalidToken });
    });
    it('Testa se não é possível criar partidas se não for um admin.', async (): Promise<void> => {
      sinon.restore();
      sinon
        .stub(Match, 'create')
        .resolves({} as any);
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns({ ...usersList.user.validUser } as ILoginInfo);
      sinon
        .stub(Match, 'findAll')
        .resolves([...teams] as any);
      const response: Response = await chai
          .request(app)
          .post('/matches')
          .send({ ...matchesMock.create.insert.correct });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ ...matchesMock.create.return.invalidToken });
    });
  });
  describe('Testa rotas update.', () => {
    beforeEach(() => {
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.userSession as IUserSession);
      sinon
        .stub(Match, 'update')
        .resolves( [0, [matchesList[0]]] as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Testa se é possível finalizar uma partida com sucesso.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves( matchesList[0] as any);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1/finish')
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.finishCorrect });
    });
    it('Testa se é possível alterar uma partida com sucesso.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves( matchesList[0] as any);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send({ ...matchesMock.update.insert.correct });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.correct });
    });
    it('Testa se não é possível finalizar uma partida inexistente.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves(null);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1/finish')
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.finishNotFound});
    });
    it('Testa se não é possível alterar uma partida inexistente.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves(null);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send({ ...matchesMock.update.insert.correct });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.notFound });
    });
    it('Testa se não é possível alterar uma partida sem goals do time de casa.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send({ ...matchesMock.update.insert.noHomeGoals });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.noHomeGoals });
    });
    it('Testa se não é possível alterar uma partida sem goals do time de fora.', async () => {
      sinon
        .stub(Match, 'findOne')
        .resolves({} as any);
      const response: Response = await chai
          .request(app)
          .patch('/matches/1')
          .send({ ...matchesMock.update.insert.noAwayGoals });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ ...matchesMock.update.return.noAwayGoals });
    });
  });
});
