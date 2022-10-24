import { Request, Response } from 'express';
import { ITeamsService } from '../../services/teams';
import { ITeamsController } from './types';

class TeamsController implements ITeamsController {
  private service: ITeamsService;

  constructor(service: ITeamsService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { status, result } = await this.service.getAll();
    return res.status(status).json(result);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, result } = await this.service.getById(Number(id));
    return res.status(status).json(result);
  }
}

export default TeamsController;
