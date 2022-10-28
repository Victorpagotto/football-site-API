import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teams from './Mocks/Leaderbord/teams';
import matches from './Mocks/Leaderbord/matches'
import homeLeaderboard from './Mocks/Leaderbord/homeLeaderboard';
import awayLeaderboard from './Mocks/Leaderbord/awayLeaderboard';
import generalLeaderboard from './Mocks/Leaderbord/generalLeaderboard';

import { Response } from 'superagent';

import JWTAuthetificator from '../authentification/JWT';
import loginMock from './Mocks/Login';
import Team from '../database/models/teamsModel';
import Match from '../database/models/matchesModel';
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
      sinon
        .stub(Match, 'findAll')
        .resolves([...matches] as any);
    });
    afterEach(()=>{
      sinon.restore();
    });
    it('Testa o retorno de leaderboard/home', async (): Promise<void> => {
      const response: Response = await chai
          .request(app)
          .get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...homeLeaderboard]);
    });
    it('Testa o retorno de leaderboard/away', async (): Promise<void> => {
      const response: Response = await chai
          .request(app)
          .get('/leaderboard/away');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...awayLeaderboard]);
    });
    it('Testa o retorno de leaderboard', async (): Promise<void> => {
      const response: Response = await chai
          .request(app)
          .get('/leaderboard');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([...generalLeaderboard]);
    });
  });
})