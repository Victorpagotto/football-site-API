import { Request, Response } from 'express';
import { ILeaderboardService } from '../../services/leaderboard';
import { ILeaderboardController } from './types';

class LeaderboardController implements ILeaderboardController {
  private service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this.service = service;
    this.awayLeaderboard = this.awayLeaderboard.bind(this);
    this.homeLeaderboard = this.homeLeaderboard.bind(this);
    this.leaderboard = this.leaderboard.bind(this);
  }

  public async awayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, result } = await this.service.leaderboard(['away']);
    return res.status(status).json(result);
  }

  public async homeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, result } = await this.service.leaderboard(['home']);
    return res.status(status).json(result);
  }

  public async leaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, result } = await this.service.leaderboard(['home', 'away']);
    return res.status(status).json(result);
  }
}

export default LeaderboardController;
