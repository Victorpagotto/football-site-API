import ValidationLogin from '../../validation/user/validation';
import User from '../../database/models/usersModel';
import { ILoginService, IUserInfo, IUserSession } from './types';
import { ILoginInfo } from '../../validation/user/types';
import { IResponse, IResponseHandler } from '../../utils/responseHandler';

import PassEncrypter from '../../authentification/Bpcrypt';

class UserService implements ILoginService {
  private model: typeof User;
  private handler: IResponseHandler;

  constructor(model: typeof User, responseHandler: IResponseHandler) {
    this.model = model;
    this.handler = responseHandler;
    this.login = this.login.bind(this);
    this.getById = this.getById.bind(this);
  }

  public async login(loginInfo: ILoginInfo): Promise<IResponse<IUserSession> | IResponse<string>> {
    const validator = new ValidationLogin(loginInfo, { passwordSize: 7 });
    const { status, result } = validator.validate();
    if (status !== 'ok') {
      return this.handler.response<string>(status, result as string);
    }
    const { email, password } = loginInfo;
    const user: IUserInfo | null = await this.model.findOne({ where: { email } });
    if (!(user && PassEncrypter.read(user.password, password))) {
      return this.handler.response<string>('unauthorized', 'Incorrect email or password');
    }
    const session: IUserSession = {
      email: user.email,
      role: user.role,
      username: user.username,
      id: user.id,
    };
    return this.handler.response<IUserSession>('ok', session);
  }

  public async getById(id: number): Promise<IResponse<IUserSession> | IResponse<string>> {
    const user: IUserInfo | null = await this.model.findOne({ where: { id } });
    if (!user) {
      return this.handler.response<string>('notFound', 'User not found.');
    }
    const session: IUserSession = {
      email: user.email,
      role: user.role,
      username: user.username,
      id: user.id,
    };
    return this.handler.response<IUserSession>('ok', session);
  }
}

export default UserService;
