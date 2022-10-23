import { config } from 'dotenv';
import { Request, Response } from 'express';
import { IUserSession } from '../../services/users/types';
import { IAuthetificator } from '../../authentification/JWT';

import { ILoginInfo, ILoginService, IUserInfo } from '../../services/users';
import { IUsersController } from './types';

config();

class UsersController implements IUsersController {
  private service: ILoginService;
  private auth: IAuthetificator;

  constructor(service: ILoginService, auth: IAuthetificator) {
    this.service = service;
    this.auth = auth;
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const loginInfo: ILoginInfo = req.body;
    const { status, result } = await this.service.login(loginInfo);
    const secret = process.env.JWT_SECRET;
    if (status === 200) {
      return res.status(status)
        .json(this.auth.encode<IUserSession>(result as IUserSession, secret));
    }
    return res.status(status).json(result);
  };

  public getRole = async (_req: Request, res: Response): Promise<Response> => {
    const userInfo: IUserInfo = res.locals as IUserInfo;
    const { status, result } = await this.service.getById(userInfo.id);
    if (status !== 200) {
      return res.status(status).json(result);
    }
    const info = result as IUserSession;
    const role = { role: info.role };
    return res.status(status).json(role);
  };
}

export default UsersController;
