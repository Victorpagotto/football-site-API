import { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { ITeam, ITeamsService } from './types';
import Team from '../../database/models/teamsModel';

class TeamsService implements ITeamsService {
  private _model: typeof Team;
  private _handler: IResponseHandler;

  constructor(model: typeof Team, responseHandler: IResponseHandler) {
    this._model = model;
    this._handler = responseHandler;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async getAll(): Promise<IResponse<ITeam[]> | IResponse<string>> {
    const teams: ITeam[] = await this._model.findAll();
    return this._handler.response<ITeam[]>('ok', teams);
  }

  public async getById(id: number): Promise<IResponse<ITeam> | IResponse<string>> {
    const team: ITeam | null = await this._model.findOne({ where: { id } });
    if (!team) {
      return this._handler.response<string>('notFound', 'Team not found.');
    }
    return this._handler.response<ITeam>('ok', team);
  }
}

export default TeamsService;
