import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

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
  sequelize: db,
  timestamps: false,
  modelName: 'Team',
  underscored: true,
  tableName: 'teams',
});

export default Team;
