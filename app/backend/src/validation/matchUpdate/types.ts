import { IResponseHandler } from '../../utils/responseHandler';

export interface IMatchInsert {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IConfig {
  [key: string]: unknown;
  responseHandler?: IResponseHandler;
}
