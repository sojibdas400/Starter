import databaseConfig from './database.config';

export default () => ({
  port: process.env.PORT,
  database: databaseConfig,
});
