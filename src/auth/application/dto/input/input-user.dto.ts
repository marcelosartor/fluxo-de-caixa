import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class InputUserDto {
  @ApiProperty({ description: 'Nome do usuario', example: 'José da Silva Sauro' })
  @IsString()
  @IsNotEmpty()
  public nome: string

  @ApiProperty({
    description: 'Email do usuario. Utilizado como chave de login',
    example: 'teste@teste.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string

}
