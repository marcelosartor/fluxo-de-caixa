import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EnvConfigService } from 'src/core/env-config/services/env-config.service'
import { Credential } from '../models/credential.model'
import { AuthUnauthorizedException } from 'src/core/exception-handler/domain/exceptions/auth-unauthorized.exception'

@Injectable()
export class PostCheckTokenAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}

  async getCheckToken(credential: Credential): Promise<any> {
    try {
      await this.getCheckTokenByToken(credential.accessToken)
      return 'Token valido'
    } catch (error) {
      throw new AuthUnauthorizedException('Token Invalido')
    }
  }

  async getCheckTokenByToken(token: string): Promise<any> {
    const options = { secret: this.configService.getJwtSecret() }
    try {
      return await this.jwtService.verifyAsync(token, options)
    } catch (error) {
      throw new AuthUnauthorizedException('Token Invalido')
    }
  }
}
