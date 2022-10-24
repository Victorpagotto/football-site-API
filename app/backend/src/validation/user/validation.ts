import ResponseHandler, { IResponseHandler, IAnswer } from '../../utils/responseHandler';
import { conditionCheck, Validator } from '../types';

import { IConfig, ILoginInfo } from './types';

const UNAUTHORIZED = 'Incorrect email or password';
const BADREQUEST = 'All fields must be filled';

export default class ValidationLogin extends Validator {
  public message: string;

  public status: string;

  private _email: string;

  private _password: string;

  private _passSize: number;

  private _handler: IResponseHandler;

  private _emailRegex: RegExp;

  constructor(loginInfo: ILoginInfo, config: IConfig) {
    super();
    const { passwordSize } = config;
    const standardResponser = config.responseHandler || ResponseHandler;
    const standardEmailRegex = /^((\w+)([.-]?\w+)*)@((\w+)([.-]?\w+)*(\.\w+))/i;
    this._email = loginInfo.email;
    this._password = loginInfo.password;
    this._passSize = passwordSize;
    this.message = 'Not validated';
    this.status = 'Not validated';
    this._handler = config.responseHandler || standardResponser;
    this._emailRegex = config.emailRegex || standardEmailRegex;
  }

  // Condition, message, status.
  protected get checkConditions(): conditionCheck[] {
    return [
      [!this._password, BADREQUEST, 'badRequest'],
      [!this._email, BADREQUEST, 'badRequest'],
      [typeof this._email !== 'string', BADREQUEST, 'badRequest'],
      [typeof this._password !== 'string', BADREQUEST, 'badRequest'],
      [!this._emailRegex.test(this._email), UNAUTHORIZED, 'unauthorized'],
      [!!this._password && this._password.length < this._passSize, UNAUTHORIZED, 'unauthorized'],
    ];
  }

  public validate = (): IAnswer<boolean> | IAnswer<string> => {
    if (this.checking()) {
      return this._handler.answer<string>(this.status, this.message);
    }
    return this._handler.answer<boolean>('ok', true);
  };
}
