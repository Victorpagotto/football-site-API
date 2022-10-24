import { IResponseHandler } from '../../utils/responseHandler';

export interface IMatchInfo {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IConfig {
  [key: string]: unknown;
  responseHandler?: IResponseHandler;
}
