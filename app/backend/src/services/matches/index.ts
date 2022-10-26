import { IMatch, IMatchRaw, IMatchesService } from './types';
import MatchesService from './matchesService';
import Match from '../../database/models/matchesModel';
import Team from '../../database/models/teamsModel';
import ResponseHandler from '../../utils/responseHandler';

export { IMatch, IMatchRaw, IMatchesService };
export default new MatchesService(Match, Team, ResponseHandler);
