import ResponseHandler, { IResponse, IResponseHandler } from '../../utils/responseHandler';
import { conditionCheck, Validator } from '../types';

import { IConfig, ILoginInfo } from './types';

export default class ValidationLogin implements Validator {
  private _email: string;

  private _password: string;

  public message: string;

  public status: string;

  private _passSize: number;

  private _handler: IResponseHandler;

  private _emailRegex: RegExp;

  constructor(loginInfo: ILoginInfo, config: IConfig) {
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
      [!this._email, '"email" is required', 'badRequest'],
      [!this._password, '"password" is required', 'badRequest'],
      [!this._emailRegex.test(this._email), '"email" must be a valid email', 'badRequest'],
      [
        this._password.length < this._passSize,
        `"password" length must be at least ${this._passSize} characters long`,
        'badRequest',
      ],
    ];
  }

  public checking = (): boolean => {
    const conditions: conditionCheck[] = [...this.checkConditions];
    for (let i = 0; i < conditions.length; i += 1) {
      const [condition, message, status]: conditionCheck = conditions[i];
      if (condition) {
        this.message = message;
        this.status = status;
        return true;
      }
    }
    return false;
  };

  validate = (): IResponse<boolean> | IResponse<string> => {
    if (this.checking()) {
      return this._handler.response<string>(this.status, this.message);
    }
    return this._handler.response('OK', true) as IResponse<boolean>;
  };
}
