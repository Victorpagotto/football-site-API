import { config } from 'dotenv';
import { Request, Response } from 'express';
import { IUserSession } from '../../services/users/types';
import { IAuthetificator } from '../../authentification/JWT';

import { ILoginInfo, ILoginService } from '../../services/users';
import { IUsersController } from './types';

config();

class UsersController implements IUsersController {
  private service: ILoginService;
  private auth: IAuthetificator;

  constructor(service: ILoginService, auth: IAuthetificator) {
    this.service = service;
    this.auth = auth;
    this.login = this.login.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const loginInfo: ILoginInfo = req.body;
    const { status, result } = await this.service.login(loginInfo);
    const secret = process.env.JWT_SECRET;
    if (status === 200) {
      return res.status(status)
        .json(this.auth.encode<IUserSession>(result as IUserSession, secret));
    }
    return res.status(status).json(result);
  }

  public async getRole(_req: Request, res: Response): Promise<Response> {
    const userInfo: IUserSession = res.locals as IUserSession;
    const { status, result } = await this.service.getById(userInfo.id);
    if (status !== 200) {
      return res.status(status).json(result);
    }
    const info = result as IUserSession;
    const role = { role: info.role };
    return res.status(status).json(role);
  }
}

export default UsersController;
