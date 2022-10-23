import ResponseHandler, { IResponse, IResponseHandler } from '../../utils/responseHandler';

import { IConfig, ILoginInfo } from './types';

export default class ValidationLogin {
  private _email: string;

  private _password: string;

  private _message: string;

  private _status: string;

  private _passSize: number;

  private _handler: IResponseHandler;

  private _emailRegex: RegExp;

  constructor(loginInfo: ILoginInfo, config: IConfig) {
    const { responseHandler, passwordSize } = config;
    this._email = loginInfo.email;
    this._password = loginInfo.password;
    this._passSize = passwordSize;
    this._message = '';
    this._status = 'OK';
    const standardResponser = ResponseHandler;
    this._handler = responseHandler || standardResponser;
    const standardEmailRegex = /^((\w+)([.-]?\w+)*)@((\w+)([.-]?\w+)*(\.\w+))/i;
    this._emailRegex = config.emailRegex || standardEmailRegex;
  }

  public get email(): string {
    return this._email;
  }

  protected emailExists = (): void => {
    if (!this._email) {
      this._message = '"username" is required';
      this._status = 'badRequest';
    }
  };

  protected passwordExists = (): void => {
    if (!this._password) {
      this._message = '"password" is required';
      this._status = 'badRequest';
    }
  };

  protected emailFormat = (): void => {
    if (!this._emailRegex.test(this._email)) {
      this._message = '"email" must be a valid email';
      this._status = 'badRequest';
    }
  };

  protected passwordSize = (): void => {
    if (this._password.length < this._passSize) {
      this._message = `"password" length must be at least ${this._passSize} characters long`;
      this._status = 'badRequest';
    }
  };

  public validateEmail = (): boolean => {
    const funcs: (() => void)[] = [
      this.emailExists,
      this.emailFormat,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this._message) return true;
    }
    return false;
  };

  public validatePassword = (): boolean => {
    const funcs: (() => void)[] = [
      this.passwordExists,
      this.passwordSize,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this._message) return true;
    }
    return false;
  };

  validate = (): IResponse<boolean> | IResponse<string> => {
    const funcs: (() => boolean | void)[] = [
      this.validateEmail,
      this.validatePassword,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      if (funcs[i]()) {
        return this._handler.response<string>(this._status, this._message);
      }
    }
    return this._handler.response('OK', true) as IResponse<boolean>;
  };
}
