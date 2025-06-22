import { Expose } from "class-transformer"
import { User } from "src/auth/domain/entities/user.entity"

export class OutputUserDto {
    constructor(value: any) {
        this.name = value.name
        this.email = value.email
      }
    @Expose()
    public name: string
    @Expose()
    public email: string
}
  