import { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { IMatch, IMatchesService } from './types';
import { IMatchInsert } from '../../validation/matchUpdate';
import { IMatchInfo } from '../../validation/matchCreate';

import Match from '../../database/models/matchesModel';
import Team from '../../database/models/teamsModel';

class MatchesService implements IMatchesService {
  private model: typeof Match;
  private auxModel: typeof Team;
  private handler: IResponseHandler;

  constructor(model: typeof Match, auxModel: typeof Team, responseHandler: IResponseHandler) {
    this.model = model;
    this.auxModel = auxModel;
    this.handler = responseHandler;
    this.getAll = this.getAll.bind(this);
  }
  // { model: Teams, as: 'teamHome', attributes: ['teamName'] },
  // { model: Teams, as: 'teamAway', attributes: ['teamName'] },

  public async getAll(): Promise<IResponse<IMatch[]>> {
    const matchList: IMatch[] = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    });
    return this.handler.response<IMatch[]>('ok', matchList);
  }

  public async getFiltered(state: boolean): Promise<IResponse<IMatch[]>> {
    const matchList: IMatch[] = await Match.findAll({
      where: { inProgress: state },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return this.handler.response<IMatch[]>('ok', matchList);
  }

  public async create(matchInfo: IMatchInfo): Promise<IResponse<IMatchRaw> | IResponse<string>> {

  }

  public async update(id: number, matchInsert: IMatchInsert): Promise<IResponse<string>> {

  }

  public async finish(id: number): Promise<IResponse<string>> {

  }
}

export default MatchesService;
