import Team from '../../database/models/teamsModel';
import Match from '../../database/models/matchesModel';
import responseHandler from '../../utils/responseHandler';
import { dictionary } from './initializers';
import {
  IMatchIndex,
  IObjectStats,
  ITeamDictionnary,
  ITeamIndex,
  ITeamStat,
  homeDict,
  awayDict,
  dictInput,
  dictOutput,
  matchResult,
  ILeaderboardService } from './types';
import LeaderboardService from './leaderboardService';

export {
  IMatchIndex,
  IObjectStats,
  ITeamDictionnary,
  ITeamIndex,
  ITeamStat,
  homeDict,
  awayDict,
  dictInput,
  dictOutput,
  matchResult,
  ILeaderboardService };

export default new LeaderboardService(Team, Match, responseHandler, dictionary);
