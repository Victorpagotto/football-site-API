import { IAnswer, IResponse, IResponseHandler } from '../../utils/responseHandler';
import { IMatch, IMatchesService, IMatchRaw } from './types';
import ValidationUpdateMatch, { IMatchInsert } from '../../validation/matchUpdate';
import ValidationMatchCreate, { IMatchInfo } from '../../validation/matchCreate';

import Match from '../../database/models/matchesModel';
import Team from '../../database/models/teamsModel';
import { ITeam } from '../teams';
import { IUserSession } from '../users/types';

class MatchesService implements IMatchesService {
  private model: typeof Match;
  private auxModel: typeof Team;
  private handler: IResponseHandler;

  constructor(model: typeof Match, auxModel: typeof Team, responseHandler: IResponseHandler) {
    this.model = model;
    this.auxModel = auxModel;
    this.handler = responseHandler;
    this.getAll = this.getAll.bind(this);
    this.getFiltered = this.getFiltered.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.finish = this.finish.bind(this);
  }

  public async getAll(): Promise<IResponse<IMatch[]>> {
    const matchList: IMatch[] = await Match.findAll({ include: [
      { model: this.auxModel, as: 'teamHome', attributes: ['teamName'] },
      { model: this.auxModel, as: 'teamAway', attributes: ['teamName'] },
    ],
    });
    return this.handler.response<IMatch[]>('ok', matchList);
  }

  public async getFiltered(inProgress: boolean): Promise<IResponse<IMatch[]>> {
    const matchList: IMatch[] = await Match.findAll({
      where: { inProgress },
      include: [
        { model: this.auxModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this.auxModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return this.handler.response<IMatch[]>('ok', matchList);
  }

  public async create(
    matchInfo: IMatchInfo,
    user: IUserSession,
  ): Promise<IResponse<IMatchRaw> | IResponse<string>> {
    if (user.role !== 'admin') {
      return this.handler.response('unauthorized', 'Token must be a valid token');
    }
    const teamList: ITeam[] = await this.auxModel.findAll();
    const validator = new ValidationMatchCreate(matchInfo, teamList, {});
    const { status, result }: IAnswer<boolean> | IAnswer<string> = validator.validate();
    if (status !== 'ok') {
      return this.handler.response<string>(status, result as string);
    }
    const createdTeam: IMatchRaw = await this.model.create({ ...matchInfo, inProgress: true });
    return this.handler.response('created', createdTeam);
  }

  public async update(id: number, matchInsert: IMatchInsert): Promise<IResponse<string>> {
    const validator = new ValidationUpdateMatch(matchInsert, {});
    const { status, result }: IAnswer<boolean> | IAnswer<string> = validator.validate();
    if (status !== 'ok') {
      return this.handler.response(status, result as string);
    }
    const isMatch = await this.model.findOne({ where: { id } });
    if (!isMatch) {
      return this.handler.response('notFound', 'Match not found.');
    }
    await this.model.update({ ...matchInsert }, { where: { id } });
    return this.handler.response('ok', 'Match updated.');
  }

  public async finish(id: number): Promise<IResponse<string>> {
    const isMatch = await this.model.findOne({ where: { id } });
    if (!isMatch) {
      return this.handler.response('notFound', 'Match not found.');
    }
    await this.model.update({ inProgress: false }, { where: { id } });
    return this.handler.response('ok', 'Finished');
  }
}

export default MatchesService;
