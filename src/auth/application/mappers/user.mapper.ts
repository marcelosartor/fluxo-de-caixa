import { Injectable } from '@nestjs/common'
import { InputUserDto } from '../dto/input/input-user.dto'
import { plainToClass } from 'class-transformer'
import { User } from 'src/auth/domain/entities/user.entity'
import { OutputUserDto } from '../dto/output/output-user.dto'


@Injectable()
export class UserMapper {
  disassembler<T>(userDto: T): User {
    const entity: User = plainToClass(User, userDto)
    return entity
  }

  assembler(value: any): OutputUserDto {
    const dto: OutputUserDto = new OutputUserDto(value)
    return dto
  }

}
