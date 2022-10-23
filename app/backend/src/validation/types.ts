import { IResponse } from '../utils/responseHandler';

export type conditionCheck = [boolean, string, string];

export interface Validator {
  message: string;
  status: string;
  checking(): boolean;
  validate(): IResponse<boolean> | IResponse<string>;
}
