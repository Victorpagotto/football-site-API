import { Model, STRING, INTEGER } from 'sequelize/types';
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

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeams' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default Team;
