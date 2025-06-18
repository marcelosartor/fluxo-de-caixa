import { Injectable } from '@nestjs/common'
import { EnvConfig } from '../domain/interfaces/env-config.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') ?? 'DEV'
  }
  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'))
  }
  

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') ?? 'secret'
  }
  getJwtExpiresInSeconds(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN')) ?? 3600
  }

  getExceptionHandleUrlBase(): string {
    return this.configService.get<string>('EXCEPTION_HANDLE_URL_BASE') ?? 'http://localhost:3000'
  }
  

  static loadConfigEnv() {
    switch (process.env.NODE_ENV) {
      case 'PROD':
        return ['.env']
      case 'DEV':
        return ['.env.dev']
      case 'LOCAL':
        return ['.env.local']
      default:
        return ['.env']
    }
  }
}
