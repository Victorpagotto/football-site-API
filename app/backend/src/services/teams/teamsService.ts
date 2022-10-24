import { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { ITeam, ITeamsService } from './types';
import Team from '../../database/models/teamsModel';

class TeamsService implements ITeamsService {
  private model: typeof Team;
  private handler: IResponseHandler;

  constructor(model: typeof Team, responseHandler: IResponseHandler) {
    this.model = model;
    this.handler = responseHandler;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async getAll(): Promise<IResponse<ITeam[]> | IResponse<string>> {
    const teams: ITeam[] = await this.model.findAll();
    return this.handler.response<ITeam[]>('ok', teams);
  }

  public async getById(id: number): Promise<IResponse<ITeam> | IResponse<string>> {
    const team: ITeam | null = await this.model.findOne({ where: { id } });
    if (!team) {
      return this.handler.response<string>('notFound', 'Team not found.');
    }
    return this.handler.response<ITeam>('ok', team);
  }
}

export default TeamsService;
