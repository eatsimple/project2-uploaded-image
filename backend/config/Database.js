import { Sequelize } from 'sequelize';

const db = new Sequelize('project2', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
