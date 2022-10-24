import UsersService from './usersService';
import { IUserInfo, ILoginService } from './types';
import { ILoginInfo } from '../../validation/user';
import User from '../../database/models/usersModel';
import responseHandler from '../../utils/responseHandler';

export { IUserInfo, ILoginService, ILoginInfo };
export default new UsersService(User, responseHandler);
