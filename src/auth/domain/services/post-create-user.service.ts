import { Injectable } from "@nestjs/common"
import { User } from "../entities/user.entity"
import { UserExistsException } from "src/core/exception-handler/domain/exceptions/user-exists.exception"
import { UserRepository } from "src/auth/infra/repositories/user.repository"

@Injectable()
export class PostCreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: User): Promise<User> {
    try {
      const userExists = await this.userRepository.findOneByEmail(user.email)
      if (userExists) {
        throw new UserExistsException(`O e-mail: ${user.email} já esta cadastrado!`)
      }
                  
      user.password = '123456'
      return await this.userRepository.create(user)
    } catch (error) {
      throw error
    }
  }
}
