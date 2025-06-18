import { Module } from '@nestjs/common'
import { User } from './domain/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { EnvConfigService } from 'src/core/env-config/services/env-config.service'
import { PostCreateUserController } from './application/controllers/post-create-user.controller'
import { UserMapper } from './application/mappers/user.mapper'
import { UserRepository } from './infra/repositories/user.repository'
import { PostCreateUserService } from './domain/services/post-create-user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ]),
    JwtModule.registerAsync({
      useFactory: async (configService: EnvConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        //singOptions: { expiresIn: `${configService.getJwtExpiresInSeconds()}s` },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [
    PostCreateUserController,
  ],
  providers: [
    UserMapper,UserRepository,PostCreateUserService
  ],
})
export class AuthModule {}
