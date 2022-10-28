import express = require('express');
import LeaderboardController from '../controllers/leaderboard';

const leaderboardRouter = express.Router();
leaderboardRouter.use(express.json());

leaderboardRouter.get('/home', LeaderboardController.homeLeaderboard);
leaderboardRouter.get('/away', LeaderboardController.awayLeaderboard);
leaderboardRouter.get('/', LeaderboardController.leaderboard);

export default leaderboardRouter;
