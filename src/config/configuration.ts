import * as path from 'path';

export default () => ({
  port: process.env.PORT,
  database: {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.resolve('dist/**/*.entity{.ts,.js}')],
    logging: false,
    synchronize: false,
    autoLoadEntities: true,
    keepConnectionAlive: false,
  },
});
