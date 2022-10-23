import { ILoginInfo } from '../../validation/user';
import { IResponse } from '../../utils/responseHandler';

export interface IUserSession {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface IUserInfo extends IUserSession{
  password: string;
}

export interface ILoginService {
  login(loginInfo: ILoginInfo): Promise<IResponse<IUserSession> | IResponse<string>>;
  getById(id: number): Promise<IResponse<IUserSession> | IResponse<string>>;
}
