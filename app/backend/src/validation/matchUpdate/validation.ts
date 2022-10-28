import ResponseHandler, { IResponseHandler, IAnswer } from '../../utils/responseHandler';
import { conditionCheck, Validator } from '../types';

import { IConfig, IMatchInsert } from './types';

const BADREQUEST = 'All fields must be filled';

export default class ValidationUpdateMatch extends Validator {
  public message: string;

  public status: string;

  private _handler: IResponseHandler;

  private _homeTeamGoals: number;

  private _awayTeamGoals: number;

  constructor(matchInsert: IMatchInsert, config: IConfig) {
    super();
    const standardResponser = config.responseHandler || ResponseHandler;
    this._handler = standardResponser;
    this.message = 'Not validated';
    this.status = 'Not validated';
    this._homeTeamGoals = matchInsert.homeTeamGoals;
    this._awayTeamGoals = matchInsert.awayTeamGoals;
  }

  // Condition, message, status.
  protected get checkConditions(): conditionCheck[] {
    return [
      [!this._homeTeamGoals && this._homeTeamGoals !== 0, BADREQUEST, 'badRequest'],
      [!this._awayTeamGoals && this._awayTeamGoals !== 0, BADREQUEST, 'badRequest'],
    ];
  }

  public validate = (): IAnswer<boolean> | IAnswer<string> => {
    if (this.checking()) {
      return this._handler.answer<string>(this.status, this.message);
    }
    return this._handler.answer<boolean>('ok', true);
  };
}
