import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './teamsModel';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Match.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  underscored: true,
  timestamps: false,
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home_teams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away_teams' });

export default Match;
