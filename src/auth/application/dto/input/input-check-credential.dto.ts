import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputCheckCredentialDto {
  @ApiProperty({ description: 'Token de acesso para verificação', example: '' })
  @IsString()
  @IsNotEmpty()
  token: string
}
