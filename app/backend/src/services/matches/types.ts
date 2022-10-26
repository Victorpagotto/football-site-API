import { IMatchInsert } from '../../validation/matchUpdate';
import { IMatchInfo } from '../../validation/matchCreate';
import { IResponse } from '../../utils/responseHandler';
import { IUserSession } from '../users/types';

export interface teamMatch {
  teamName: string;
}

export interface IMatchRaw {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean | number;
}

export interface IMatch extends IMatchRaw {
  teamHome?: teamMatch;
  teamAway?: teamMatch;
}

export interface IMatchesService {
  getAll(): Promise<IResponse<IMatch[]>>;
  getFiltered(InProgress: boolean): Promise<IResponse<IMatch[]>>;
  create(
    matchInfo: IMatchInfo,
    user: IUserSession,
  ): Promise<IResponse<IMatchRaw> | IResponse<string>>
  update(id: number, matchInsert: IMatchInsert): Promise<IResponse<string>>
  finish(id: number): Promise<IResponse<string>>
}
