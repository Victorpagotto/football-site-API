import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IencryptMiddlewere } from '../types';
import { IAuthetificator } from '../../authentification/JWT';
import { IUserInfo } from '../../services/users';
import { IResponseHandler } from '../../utils/responseHandler';

config();

class JWTMiddlewere implements IencryptMiddlewere {
  private authenticator: IAuthetificator;
  private handler: IResponseHandler;
  constructor(authenticator: IAuthetificator, handler: IResponseHandler) {
    this.authenticator = authenticator;
    this.handler = handler;
    this.auth = this.auth.bind(this);
  }

  public async auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token: string = req.header('Authorization') as string;
    try {
      const secret = process.env.JWT_SECRET;
      const userInfo: IUserInfo = this.authenticator.decode(token, secret);
      res.locals = userInfo;
      return next();
    } catch (_err) {
      const { status, result } = this.handler.response('unauthorized', 'Invalid token.');
      return res.status(status).json(result);
    }
  }
}

export default JWTMiddlewere;
