import { ValidationError } from '@nestjs/common'

export class ValidationException extends Error {
  constructor(validationErrors: ValidationError[]) {
    super()
    this.validationErrors = validationErrors
  }
  public validationErrors: ValidationError[]
}
