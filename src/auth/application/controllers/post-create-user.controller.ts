import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputUserDto } from "../dto/input/input-user.dto";
import { PostCreateUserService } from "src/auth/domain/services/post-create-user.service";
import { UserMapper } from "../mappers/user.mapper";
import { OutputUserDto } from "../dto/output/output-user.dto";

@ApiTags('OAuth')
@Controller('oauth')
export class PostCreateUserController {
  constructor(
    private readonly postCreateUserService: PostCreateUserService,
    private readonly userMapper: UserMapper,
  ) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'Usuario e senha do client em basic authorization',
    example: 'Basic *****',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Problemas com os dados enviados no payload ou sua estrutura',
  })
  @ApiOperation({ summary: 'Cria um novo usuario.' })
  //@UseGuards(BasicGuard)
  @Post('/user')
  async createUser(@Body() userDto: InputUserDto): Promise<OutputUserDto> {
     return this.userMapper.assembler(
        await this.postCreateUserService.createUser(
            this.userMapper.disassembler<InputUserDto>(userDto)
        )
      )
  }
}
