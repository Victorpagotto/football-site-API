import { IMessage, IResponse, IStatusCodes, IResponseHandler } from './types';
import ResponseHandler, { statusCodes } from './responseHandler';

export { IMessage, IResponse, IStatusCodes, IResponseHandler };

export default new ResponseHandler(statusCodes);
