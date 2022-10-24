import { ITeamsController } from './types';
import TeamsController from './teamsController';
import TeamsService from '../../services/teams';

export { ITeamsController };
export default new TeamsController(TeamsService);
