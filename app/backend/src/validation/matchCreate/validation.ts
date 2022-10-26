import { ITeam } from '../../services/teams';
import ResponseHandler, { IResponseHandler, IAnswer } from '../../utils/responseHandler';
import { conditionCheck, Validator } from '../types';

import { IConfig, IMatchInfo } from './types';

const BADREQUEST = 'All fields must be filled';

export default class ValidationMatchCreate extends Validator {
  public message: string;

  public status: string;

  private _handler: IResponseHandler;

  private _homeTeam: number;

  private _awayTeam: number;

  private _homeTeamGoals: number;

  private _awayTeamGoals: number;

  private _teamsId: number[];

  constructor(matchInfo: IMatchInfo, teamList: ITeam[], config: IConfig) {
    super();
    const standardResponser = config.responseHandler || ResponseHandler;
    this._handler = standardResponser;
    this.message = 'Not validated';
    this.status = 'Not validated';
    this._homeTeam = matchInfo.homeTeam;
    this._awayTeam = matchInfo.awayTeam;
    this._homeTeamGoals = matchInfo.homeTeamGoals;
    this._awayTeamGoals = matchInfo.awayTeamGoals;
    this._teamsId = ValidationMatchCreate.genIdList(teamList);
  }

  private static genIdList(teamList: ITeam[]): number[] {
    return teamList.map<number>((team: ITeam): number => team.id);
  }

  // Condition, message, status.
  protected get checkConditions(): conditionCheck[] {
    return [
      [!this._homeTeam, BADREQUEST, 'badRequest'],
      [!this._awayTeam, BADREQUEST, 'badRequest'],
      [!this._homeTeamGoals, BADREQUEST, 'badRequest'],
      [!this._awayTeamGoals, BADREQUEST, 'badRequest'],
      [!this._teamsId.includes(this._homeTeam), 'There is no team with such id!', 'notFound'],
      [!this._teamsId.includes(this._awayTeam), 'There is no team with such id!', 'notFound'],
      [this._homeTeam === this._awayTeam,
        'It is not possible to create a match with two equal teams',
        'unprocessable'],
    ];
  }

  public validate = (): IAnswer<boolean> | IAnswer<string> => {
    if (this.checking()) {
      return this._handler.answer<string>(this.status, this.message);
    }
    return this._handler.answer<boolean>('ok', true);
  };
}
