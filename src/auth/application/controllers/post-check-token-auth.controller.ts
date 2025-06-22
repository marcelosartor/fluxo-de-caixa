import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CredentialMapper } from '../mappers/credential.mapper'
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InputCheckCredentialDto } from '../dto/input/input-check-credential.dto'
import { OutputCheckCredentialDto } from '../dto/output/output-check-credential.dto'
import { PostCheckTokenAuthService } from 'src/auth/domain/services/post-check-token-auth.service'

@ApiTags('OAuth')
@Controller('oauth')
export class PostCheckTokenAuthController {
  constructor(
    private readonly credentialMapper: CredentialMapper,
    private readonly postCheckTokenAuthService: PostCheckTokenAuthService,
  ) {}

  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token invalido',
  })
  @ApiOperation({ summary: 'Verifica se um token é valido' })
  @Post('/check_token')
  async checkToken(@Body() checkCredentialDto: InputCheckCredentialDto): Promise<OutputCheckCredentialDto> {
    return this.credentialMapper.assemblerCheck(
      await this.postCheckTokenAuthService.getCheckToken(this.credentialMapper.disassemblerCheck(checkCredentialDto)),
    )
  }
}
