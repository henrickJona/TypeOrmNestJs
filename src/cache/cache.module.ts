import { Module } from '@nestjs/common';
import { Cache } from './shared/cache';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { getAsyncRedisConfig } from '../config/redis';
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => {
        const { config } = getAsyncRedisConfig();
        return {
          config,
        };
      },
    }),
  ],
  providers: [Cache],
  exports: [Cache],
})
export class CacheModule {}
