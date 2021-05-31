type ICacheParam = string | number;

export const getAsyncRedisConfig = () => {
  return {
    config: {
      host: 'localhost',
      port: 6379,
      password: process.env.REDIS_PASS || undefined,
      keyPrefix: 'Teste:',
    },
    cacheTime: 86400,

    keys: {
      userChannel: (userId: ICacheParam) => `socket:channel@${userId}`,
    },
  };
};

const redisConfig = getAsyncRedisConfig();

export default redisConfig;
