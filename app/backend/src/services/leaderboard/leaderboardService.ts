import Match from '../../database/models/matchesModel';
import Team from '../../database/models/teamsModel';
import { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { IMatchRaw } from '../matches';
import { ITeam } from '../teams';
import { newTeam } from './initializers';
import {
  dictInput,
  dictOutput,
  ITeamDictionnary,
  ITeamIndex,
  ITeamStat,
  IMatchIndex,
  matchResult,
  IObjectStats } from './types';

class LeaderboardService {
  private _teamsModel: typeof Team;
  private _matchesModel: typeof Match;
  private _handler: IResponseHandler;
  private _dictionary: ITeamDictionnary;

  constructor(
    teamsModel: typeof Team,
    matchesModel: typeof Match,
    responseHander: IResponseHandler,
    dictionary: ITeamDictionnary,
  ) {
    this._matchesModel = matchesModel;
    this._teamsModel = teamsModel;
    this._handler = responseHander;
    this._dictionary = dictionary;
    this._dict = this._dict.bind(this);
    this._getTeamIndex = this._getTeamIndex.bind(this);
    this._calculateStatistics = this._calculateStatistics.bind(this);
    this._getBoard = this._getBoard.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
  }

  private _dict(input: dictInput): dictOutput {
    return this._dictionary[input];
  }

  private async _getTeamIndex(): Promise<ITeamIndex> {
    const teamList: ITeam[] = await this._teamsModel.findAll();
    return teamList.reduce<ITeamIndex>((acc: ITeamIndex, team: ITeam): ITeamIndex => {
      acc[`${team.id}`] = team.teamName;
      return acc;
    }, {});
  }

  private static _readResult(match: IMatchIndex, dict: dictOutput): matchResult {
    switch (true) {
      case match[dict.goals] > match[dict.against]:
        return { result: 'totalVictories', points: 3 };
      case match[dict.goals] < match[dict.against]:
        return { result: 'totalLosses', points: 0 };
      default:
        return { result: 'totalDraws', points: 1 };
    }
  }

  private static _calculateEfficiency(pointsTotal: number, gamesTotal: number): string {
    const efficiency = (pointsTotal / (gamesTotal * 3)) * 100;
    return efficiency.toFixed(2);
  }

  private _calculateStatistics(key: dictInput, match: IMatchIndex, teamStat: ITeamStat): ITeamStat {
    const teamStatCopy: ITeamStat = { ...teamStat };
    const dict: dictOutput = this._dict(key);
    const resultIndex: matchResult = LeaderboardService._readResult(match, dict);
    teamStatCopy.totalGames += 1;
    teamStatCopy.goalsOwn += match[dict.against];
    teamStatCopy.goalsFavor += match[dict.goals];
    teamStatCopy.goalsBalance = teamStat.goalsFavor - teamStat.goalsOwn;
    teamStatCopy[resultIndex.result] += 1;
    teamStatCopy.totalPoints += resultIndex.points;
    teamStatCopy.efficiency = `${LeaderboardService
      ._calculateEfficiency(teamStatCopy.totalPoints, teamStatCopy.totalGames)}%`;
    return teamStatCopy;
  }

  private _getBoard(
    matchList: IMatchIndex[],
    init: IObjectStats,
    key: dictInput,
    index: ITeamIndex,
  ): IObjectStats {
    return matchList
      .reduce<IObjectStats>((acc: IObjectStats, match: IMatchIndex): IObjectStats => {
      const dict: dictOutput = this._dict(key);
      const teamName: string = index[`${match[dict.team]}`];
      let genTeam: ITeamStat = { ...newTeam, name: teamName };
      if (!acc[teamName]) {
        acc[teamName] = this._calculateStatistics(key, match, genTeam);
        return acc;
      }
      genTeam = { ...acc[teamName] };
      acc[teamName] = this._calculateStatistics(key, match, genTeam);
      return acc;
    }, init);
  }

  private static _createStatsArray(stats: IObjectStats): ITeamStat[] {
    return Object.values(stats).map<ITeamStat>((team: ITeamStat): ITeamStat => team);
  }

  public async leaderboard(
    keys: dictInput[],
  ): Promise<IResponse<ITeamStat[]> | IResponse<string>> {
    const matchesList: IMatchRaw[] = await this._matchesModel.findAll();
    const matchIndex: IMatchIndex[] = matchesList as IMatchIndex[];
    const teamIndex: ITeamIndex = await this._getTeamIndex();
    let statsBlock: IObjectStats = {};
    keys.forEach((key: dictInput) => {
      const newStatsBlock = this._getBoard(matchIndex, statsBlock, key, teamIndex);
      statsBlock = newStatsBlock;
    });
    const statsArray: ITeamStat[] = LeaderboardService._createStatsArray(statsBlock);
    return this._handler.response('ok', statsArray);
  }
}

export default LeaderboardService;
