import { Request, Response } from 'express';

export interface IUsersController {
  login(req: Request, res: Response): Promise<Response>;
  getRole(req: Request, res: Response): Promise<Response>;
}
