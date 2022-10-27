import { ITeamDictionnary, ITeamStat } from './types';

export const newTeam: ITeamStat = {
  name: 'initializer',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '100%',
};

export const dictionary: ITeamDictionnary = {
  home: {
    team: 'homeTeam',
    goals: 'homeTeamGoals',
    against: 'awayTeamGoals',
  },
  away: {
    team: 'awayTeam',
    goals: 'awayTeamGoals',
    against: 'homeTeamGoals',
  },
};
