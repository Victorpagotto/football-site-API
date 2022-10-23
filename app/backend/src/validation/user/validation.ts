import ResponseHandler, { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { conditionCheck, Validator } from '../types';

import { IConfig, ILoginInfo } from './types';

const UNAUTHORIZED = 'Incorrect email or password';
const BADREQUEST = 'All fields must be filled';

export default class ValidationLogin extends Validator {
  private _email: string;

  private _password: string;

  public message: string;

  public status: string;

  private _passSize: number;

  private _handler: IResponseHandler;

  private _emailRegex: RegExp;

  constructor(loginInfo: ILoginInfo, config: IConfig) {
    super();
    const { passwordSize } = config;
    const standardResponser = ResponseHandler;
    const standardEmailRegex = /^((\w+)([.-]?\w+)*)@((\w+)([.-]?\w+)*(\.\w+))/i;
    this._email = loginInfo.email;
    this._password = loginInfo.password;
    this._passSize = passwordSize;
    this.message = 'Not validated';
    this.status = 'Not validated';
    this._handler = config.responseHandler || standardResponser;
    this._emailRegex = config.emailRegex || standardEmailRegex;
  }

  public get email(): string {
    return this._email;
  }

  // Condition, message, status.
  protected get checkConditions(): conditionCheck[] {
    return [
      [!this._email, BADREQUEST, 'badRequest'],
      [!this._password, BADREQUEST, 'badRequest'],
      [typeof this._email !== 'string', BADREQUEST, 'badRequest'],
      [typeof this._password !== 'string', BADREQUEST, 'badRequest'],
      [!this._emailRegex.test(this._email), UNAUTHORIZED, 'unauthorized'],
      [this._password.length < this._passSize, UNAUTHORIZED, 'unauthorized'],
    ];
  }

  public validate = (): IResponse<boolean> | IResponse<string> => {
    if (this.checking()) {
      return this._handler.response<string>(this.status, this.message);
    }
    return this._handler.response<boolean>('OK', true);
  };
}
