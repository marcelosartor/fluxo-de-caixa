import { Module } from '@nestjs/common'
import { User } from './domain/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { EnvConfigService } from 'src/core/env-config/services/env-config.service'
import { PostCreateUserController } from './application/controllers/post-create-user.controller'
import { UserMapper } from './application/mappers/user.mapper'
import { UserRepository } from './infra/repositories/user.repository'
import { PostCreateUserService } from './domain/services/post-create-user.service'
import { PostTokenAuthController } from './application/controllers/post-token-auth.controller'
import { CredentialMapper } from './application/mappers/credential.mapper'
import { PostTokenAuthService } from './domain/services/post-token-auth.service'
import { PostCheckTokenAuthController } from './application/controllers/post-check-token-auth.controller'
import { PostCheckTokenAuthService } from './domain/services/post-check-token-auth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ]),
    JwtModule.registerAsync({
      useFactory: async (configService: EnvConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        singOptions: { expiresIn: `${configService.getJwtExpiresInSeconds()}s` },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [
    PostCreateUserController,
    PostTokenAuthController,
    PostCheckTokenAuthController,
  ],
  providers: [
    UserMapper,CredentialMapper,UserRepository,PostCreateUserService,PostTokenAuthService,PostCheckTokenAuthService
  ],
})
export class AuthModule {}
