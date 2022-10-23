import ValidationLogin from '../../validation/user/validation';
import User from '../../database/models/usersModel';
import { IUserInfo } from './types';
import { ILoginInfo } from '../../validation/user/types';
import ResponseHandler, { IResponse, IResponseHandler } from '../../utils/responseHandler';

import PassEncrypter from '../../authentification/Bpcrypt';

class UserService {
  private model: typeof User;
  private handler: IResponseHandler;

  constructor(model: typeof User, responseHandler: IResponseHandler) {
    this.model = model;
    this.handler = responseHandler;
    this.login = this.login.bind(this);
  }

  public async login(loginInfo: ILoginInfo): Promise<IResponse<IUserInfo> | IResponse<string>> {
    const { status, message } = new ValidationLogin(loginInfo, { passwordSize: 7 });
    if (status !== 'ok') {
      return this.handler.response<string>(status, message as string);
    }
    const { email, password } = loginInfo;
    const user: IUserInfo | null = await this.model.findOne({ where: { email } });
    if (!(user && PassEncrypter.read(user.password, password))) {
      return this.handler.response('unauthorized', 'Incorrect email or password');
    }
    return this.handler.response<IUserInfo>('ok', user as IUserInfo);
  }
}

export default new UserService(User, ResponseHandler);
