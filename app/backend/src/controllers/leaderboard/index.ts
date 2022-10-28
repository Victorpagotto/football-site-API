import { ILeaderboardController } from './types';
import LeaderboardController from './leaderboardController';

import LeaderboardService from '../../services/leaderboard';

export { ILeaderboardController };
export default new LeaderboardController(LeaderboardService);
