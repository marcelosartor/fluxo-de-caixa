import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class InputPaginationDto {
  @ApiProperty({ description: 'Numero da pagina', example: '1' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  page: number

  @ApiProperty({ description: 'Linhas por pagina', example: '10' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  rowsPerPage?: number

  @ApiProperty({ description: 'Total de Linhas', example: '100' })
  @IsNumber()
  @Type(() => Number)
  rowsNumber?: number

  @ApiProperty({ description: 'Campo de Busca', example: 'EMAIL' })
  @IsString()
  @IsOptional()
  searchFilters?: string

  @ApiProperty({ description: 'Busca por', example: 'teste@teste.com' })
  @IsString()
  @IsOptional()
  search?: string

  @ApiProperty({ description: 'Filtro', example: 'ACTIVE' })
  @IsString()
  @IsOptional()
  fixedFilters?: string

  @IsOptional()
  sortBy?: string

  @IsOptional()
  descending?: string
}
