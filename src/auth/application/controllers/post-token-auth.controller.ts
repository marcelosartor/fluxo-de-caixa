import { Body, Controller, Headers, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBasicAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputClientCredentialDto } from "../dto/input/input-client-credential.dto";
import { OutputCredentialDto } from "../dto/output/output-credential.dto";
import { CredentialMapper } from "../mappers/credential.mapper";
import { PostTokenAuthService } from "src/auth/domain/services/post-token-auth.service";

@ApiTags('OAuth')
@Controller('oauth')
export class PostTokenAuthController {
  constructor(
    private readonly postTokenAuthService: PostTokenAuthService,
    private readonly clientCredentialMapper: CredentialMapper,
  ) {}
  
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Problemas com os dados enviados no payload ou sua estrutura',
  })
  @ApiOperation({ summary: 'Cria um token de acesso.' })
  @Post('/token')
  async generateToken(
    @Headers() pHeaders,
    @Body() inputClientCredentialDto: InputClientCredentialDto,
  ): Promise<OutputCredentialDto> {
    return this.clientCredentialMapper.assembler(
      await this.postTokenAuthService.generateJwt(
        this.clientCredentialMapper.disassembler(pHeaders, inputClientCredentialDto),
      ),
    )
  }
}