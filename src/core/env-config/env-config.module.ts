import { Global, Module } from '@nestjs/common'
import { EnvConfigService } from './services/env-config.service'
import { ConfigModule } from '@nestjs/config'
import { allowedNodeEnvironmentFlags } from 'process'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: EnvConfigService.loadConfigEnv(),
      validationOptions: {
        allowUnknown: false,
      },
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
