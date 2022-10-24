import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import JWTAuthetificator from '../authentification/JWT';
import teamsMock from './Mocks/Teams';
import { ILoginInfo } from '../validation/user/types';
import Team from '../database/models/teamsModel';
import loginMock from './Mocks/Login';
import teamList from './Mocks/Teams/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de teams.',() => {
  describe('conexão get.', () => {
    beforeEach(() => {
      sinon
        .stub(JWTAuthetificator, "decode")
        .returns(loginMock.correct.user as ILoginInfo);
      sinon
        .stub(Team, 'findAll')
        .resolves([...teamList] as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Testa o retorno correto de todos os times', async (): Promise<void> => {
      const response: Response = await chai
          .request(app)
          .get('/teams');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal([...teamList]);
    });
    it('Testa o retorno caso um time não exista.', async (): Promise<void> => {
      sinon
        .stub(Team, 'findOne')
        .resolves(null)
      const response: Response = await chai
          .request(app)
          .get('/teams/1');
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal(teamsMock.incorrect.teamNotFound);
    });
    it('Testa o retorno correto de um time pelo id', async (): Promise<void> => {
      sinon
        .stub(Team, 'findOne')
        .resolves(teamList[0] as any)
      const response: Response = await chai
          .request(app)
          .get('/teams/1');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(teamList[0]);
    });
  });
});
