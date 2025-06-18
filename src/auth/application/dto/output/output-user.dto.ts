import { Expose } from "class-transformer"
import { User } from "src/auth/domain/entities/user.entity"

export class OutputUserDto {
    constructor(value: any) {
        this.nome = value.nome
        this.email = value.email
      }
    @Expose()
    public nome: string
    @Expose()
    public email: string
}
  