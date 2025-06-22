import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputClientCredentialDto {
  @ApiProperty({ description: 'Nome do usuario', example: 'teste@teste.com' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: 'Senha do usuario em base64', example: 'Zmljb3VjdXJpb3NvPw==' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'Tipo de autenticação', example: 'password' })
  @IsString()
  @IsNotEmpty()
  grant_type: string

  @ApiProperty({ description: 'Nome do cliente(app)', example: 'FRONT_APP' })
  @IsString()
  @IsNotEmpty()
  client: string
}
