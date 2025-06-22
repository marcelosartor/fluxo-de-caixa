import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EnvConfigService } from 'src/core/env-config/services/env-config.service'
import { ClientCredential } from '../models/client-credential.model'
import { Credential } from '../models/credential.model'
import { AuthClient } from '../enums/auth-client.enum'
import { AuthUnauthorizedException } from 'src/core/exception-handler/domain/exceptions/auth-unauthorized.exception'
import { UserRepository } from 'src/auth/infra/repositories/user.repository'
import { User } from '../entities/user.entity'
import { YesOrNo } from 'src/core/communs/domain/enums/yes-or-no.enum'

@Injectable()
export class PostTokenAuthService {
  constructor(
    private jwtService: JwtService, //private configService: EnvConfigService,
    private configService: EnvConfigService,
    private userRepository: UserRepository,
  ) {}

  async generateJwt(clientCredendial: ClientCredential): Promise<any> {
    const user = await this.findUser(clientCredendial)
    if (!user) {
        this.throwUnauthorized()
    }else{
        const payload = {
        client: clientCredendial.client,
        user: {
            id: user.email.trim(),
            name: user.name.trim(),
        },
        authorities: []
        }
        const options = { expiresIn: this.configService.getJwtExpiresInSeconds() }
        const accessToken = await this.jwtService.signAsync(payload, options)
        const token = new Credential(clientCredendial.client, accessToken)
        return token
    }
  }

  private async findUser(clientCredendial: ClientCredential): Promise<User|null> {
    const user = await this.userRepository.findOneByEmail(clientCredendial.userName)
    return (user && clientCredendial.userPassword === user.password) ? user : null
  }

  private throwUnauthorized() {
    throw new AuthUnauthorizedException('Acesso não autorizado')
  }
}
