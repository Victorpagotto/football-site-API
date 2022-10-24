import { Request, Response } from 'express';

export interface ITeamsController {
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
}
