import { IAnswer } from '../utils/responseHandler';

export type conditionCheck = [boolean, string, string];

export abstract class Validator {
  message: string;
  status: string;
  protected abstract get checkConditions(): conditionCheck[];
  public abstract validate(): IAnswer<boolean> | IAnswer<string>;
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
}
