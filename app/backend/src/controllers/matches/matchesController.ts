import { Request, Response } from 'express';
import { IUserSession } from '../../services/users/types';
import { IMatchesService } from '../../services/matches';
import { IMatchesController } from './types';

class MatchesController implements IMatchesController {
  private service: IMatchesService;

  constructor(service: IMatchesService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.finish = this.finish.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress && (inProgress === 'true' || inProgress === 'false')) {
      const InProgressBoolean: boolean = inProgress === 'true';
      const { status, result } = await this.service.getFiltered(InProgressBoolean);
      return res.status(status).json(result);
    }
    const { status, result } = await this.service.getAll();
    return res.status(status).json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const user: IUserSession = res.locals as IUserSession;
    const match = req.body;
    const { status, result } = await this.service.create(match, user);
    return res.status(status).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const matchInsert = req.body;
    const { status, result } = await this.service.update(Number(id), matchInsert);
    return res.status(status).json(result);
  }

  public async finish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, result } = await this.service.finish(Number(id));
    return res.status(status).json(result);
  }
}

export default MatchesController;
