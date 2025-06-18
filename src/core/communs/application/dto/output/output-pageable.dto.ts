import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber } from 'class-validator'

export class OutputPageableDto<T> {
  @ApiProperty({ description: 'Conteudo da pagina', example: '[]' })
  @IsArray()
  contents: T[]

  @ApiProperty({ description: 'Total de linhas', example: '100' })
  @IsNumber()
  rowsNumber: number
}
