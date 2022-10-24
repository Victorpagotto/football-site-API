import { IResponse } from '../../utils/responseHandler';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamsService {
  getAll(): Promise<IResponse<ITeam[]> | IResponse<string>>
  getById(id: number): Promise<IResponse<ITeam> | IResponse<string>>
}
