import { Injectable, Provider } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/domain/entities/user.entity'
import { EnvConfigService } from 'src/core/env-config/services/env-config.service'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly configService: EnvConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user)
    return await this.userRepository.save(newUser)
  }

  async findOneByEmail(pEmail: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: pEmail })
  }
}
