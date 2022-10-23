import { IMessage, IResponse, IResponseHandler, IStatusCodes } from './types';

export const statusCodes: IStatusCodes = {
  ok: 200,
  notFound: 404,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  noContent: 204,
  unprocessable: 422,
};

export default class ResponseHandler implements IResponseHandler {
  protected _statusCodes: IStatusCodes;

  constructor(statusCodeList: IStatusCodes) {
    this._statusCodes = {
      ...statusCodeList,
    };
  }

  public get statusCodes(): IStatusCodes {
    return this._statusCodes;
  }

  public response<T>(status: string, response: T | string): IResponse<T> {
    if (typeof response !== 'string') {
      const result: T = response as T;
      return { status: this.statusCodes[status], result };
    }
    const message: IMessage = { message: response as string };
    return { status: this.statusCodes[status], result: message };
  }
}
