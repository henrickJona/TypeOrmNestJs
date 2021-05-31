const typeormConfig = {
  driver: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  user: process.env.TYPEORM_USERNAME,
  pass: process.env.TYPEORM_PASSWORD,
  port: process.env.TYPEORM_PORT,
  db: process.env.TYPEORM_DATABASE,
  connectionUrl: `${process.env.TYPEORM_CONNECTION}://${process.env.TYPEORM_USERNAME}:${process.env.TYPEORM_PASSWORD}@${process.env.TYPEORM_HOST}:${process.env.TYPEORM_PORT}/${process.env.TYPEORM_DATABASE}`,
};

export default typeormConfig;
