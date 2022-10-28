import { IResponse } from '../../utils/responseHandler';
import { IMatchRaw } from '../matches';

export interface ITeamIndex {
  [key: string]: string;
}

export interface ITeamStat {
  [key: string]: string | number | undefined;
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface homeDict {
  [key: string]: unknown;
  team: 'homeTeam';
  goals: 'homeTeamGoals';
  against: 'awayTeamGoals';
}

export interface awayDict {
  [key: string]: unknown;
  team: 'awayTeam';
  goals: 'awayTeamGoals';
  against: 'homeTeamGoals'
}

export interface ITeamDictionnary {
  [key: string]: unknown;
  home: homeDict;
  away: awayDict;
}

export interface IMatchIndex extends IMatchRaw{
  [key: string]: unknown;
}

export interface matchResult {
  result: 'totalVictories' | 'totalLosses' | 'totalDraws';
  points: number;
}

export interface IObjectStats {
  [key: string]: ITeamStat;
}

export type dictInput = 'home' | 'away';

export type dictOutput = homeDict | awayDict;

export interface ILeaderboardService {
  leaderboard(
    keys: dictInput[],
  ): Promise<IResponse<ITeamStat[]> | IResponse<string>>
}
