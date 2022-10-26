import { IMatchesController } from './types';
import MatchesController from './matchesController';
import MatchesService from '../../services/matches';

export { IMatchesController };
export default new MatchesController(MatchesService);
