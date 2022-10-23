import { Model, STRING, INTEGER } from 'sequelize';
import sequelize from '.';
import Match from './matchesModel';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'teams',
  underscored: true,
  tableName: 'teams',
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home_teams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away_teams' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'home_team_matches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'away_team_matches' });

export default Team;
