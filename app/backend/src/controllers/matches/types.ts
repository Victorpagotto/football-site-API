import { Request, Response } from 'express';

export interface IMatchesController {
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  finish(req: Request, res: Response): Promise<Response>;
}
