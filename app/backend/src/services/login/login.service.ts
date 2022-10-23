import User from '../../database/models/usersModel';
import { IUserInfo } from './types';

class UserService {
  model: typeof User;

  constructor(model: typeof User) {
    this.model = model;
    this.login = this.login.bind(this);
  }

  public async login(email: string): Promise<IUserInfo | null> {
    const user: IUserInfo | null = await this.model.findOne({ where: { email } });
    return user;
  }
}

export default new UserService(User);
