import { ITeam, ITeamsService } from './types';
import TeamsService from './teamsService';
import Team from '../../database/models/teamsModel';
import responseHandler from '../../utils/responseHandler';

export { ITeam, ITeamsService };
export default new TeamsService(Team, responseHandler);
