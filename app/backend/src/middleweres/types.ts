import { NextFunction, Request, Response } from 'express';

export interface IencryptMiddlewere {
  auth(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
