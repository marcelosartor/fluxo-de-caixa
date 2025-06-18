import { Injectable } from '@nestjs/common'
import { InputPaginationDto } from '../dto/input/input-pagination.dto'
import { PaginationDto } from '../../domain/dto/pagination.dto'
import { plainToClass } from 'class-transformer'
import { Page } from '../../domain/interfaces/page.interface'
import { OutputPageableDto } from '../dto/output/output-pageable.dto'

@Injectable()
export class PaginationMapper {
  disassembler(paginationDto: InputPaginationDto): PaginationDto {
    const entity: PaginationDto = plainToClass(PaginationDto, paginationDto)
    return entity
  }
  assembler<T>(page: Page<T>): OutputPageableDto<T> {
    const entity: OutputPageableDto<T> = plainToClass(OutputPageableDto<T>, page)
    return entity
  }
}
