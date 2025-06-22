import { ApiProperty } from '@nestjs/swagger'

export class OutputCheckCredentialDto {
  @ApiProperty({ description: 'Mensagem de retorno da verificação do token.', example: 'Token valido' })
  message: string
}
