import { IResponseHandler } from '../../utils/responseHandler';

export interface ILoginInfo {
  [key: string]: unknown;
  email: string;
  password: string;
}

export interface IConfig {
  [key: string]: unknown;
  passwordSize: number;
  responseHandler?: IResponseHandler;
  emailRegex?: RegExp;
}
