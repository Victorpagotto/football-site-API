import UsersController from './usersController';
import { IUsersController } from './types';
import UsersService from '../../services/users';
import JWTAuthetificator from '../../authentification/JWT';

export { IUsersController };

export default new UsersController(UsersService, JWTAuthetificator);
