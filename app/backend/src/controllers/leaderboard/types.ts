import { Request, Response } from 'express';

export interface ILeaderboardController {
  awayLeaderboard(req: Request, res: Response): Promise<Response>;
  homeLeaderboard(req: Request, res: Response): Promise<Response>;
  leaderboard(req: Request, res: Response): Promise<Response>;
}
