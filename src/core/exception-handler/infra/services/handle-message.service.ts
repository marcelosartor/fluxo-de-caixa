import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { DomainException } from '../../domain/exceptions/domain.exception'
import { ProblemMessage } from '../../domain/interfaces/problem-message.interface'
import { ValidationException } from '../../domain/exceptions/validation.exception'
import { AuthException } from '../../domain/exceptions/auth.exception'
import { QueryFailedError } from 'typeorm'
import { ProblemTypeModel } from '../../domain/models/problem-type.model'
import { DateTime } from 'luxon'
import { UserExistsException } from '../../domain/exceptions/user-exists.exception'
import { ProblemField } from '../../domain/interfaces/problem-field.interface'
import { DomainRuleException } from '../../domain/exceptions/domain-rule.exception'
import { EntityNotFoundException } from '../../domain/exceptions/entity-not-found.exception'

@Injectable()
export class HandleMessageService {
  private static instance: HandleMessageService

  public static getInstance(): HandleMessageService {
    if (!HandleMessageService.instance) {
      HandleMessageService.instance = new HandleMessageService()
    }

    return HandleMessageService.instance
  }

  execute(error: any) {
    const message = this.mountMessage(error)

    if (error instanceof EntityNotFoundException) {
      return new NotFoundException(message)
    }
    if (error instanceof DomainException) {
      return new UnprocessableEntityException(message)
    }
    if (error instanceof ValidationException) {
      return new UnprocessableEntityException(message)
    }
    if (error instanceof UserExistsException) {
      return new UnauthorizedException(message)
    }
    if (error instanceof AuthException) {
      return new UnauthorizedException(message)
    }
    if (error instanceof ForbiddenException) {
      return new ForbiddenException(message)
    }
    if (error instanceof QueryFailedError) {
      return new UnauthorizedException(message)
    }
    return new InternalServerErrorException(message)
  }

  mountMessage(error: any): ProblemMessage {
    if (error instanceof EntityNotFoundException) {
      return this.handleEntityNotFoundException(error)
    }
    if (error instanceof DomainException) {
      return this.handleDomainException(error)
    }
    if (error instanceof ValidationException) {
      return this.handleValidationException(error)
    }
    if (error instanceof UserExistsException) {
      return this.handleAuthExistsException(error)
    }
    if (error instanceof AuthException || error instanceof ForbiddenException) {
      return this.handleAuthException(error)
    }
    if (error instanceof ForbiddenException) {
      return this.handleAuthForbiddenException(error)
    }
    if (error instanceof QueryFailedError) {
      return this.handleQueryFailedError(error)
    }
    return this.handleGenericError(error)
  }

  private handleGenericError(error: DomainException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.SYSTEM_ERROR.url}`,
      title: ProblemTypeModel.SYSTEM_ERROR.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleQueryFailedError(error: DomainException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.REPOSITORY_ERROR.url}`,
      title: ProblemTypeModel.REPOSITORY_ERROR.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleAuthExistsException(error: UserExistsException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.CONFLICT,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.AUTH_EXISTS.url}`,
      title: ProblemTypeModel.AUTH_EXISTS.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleAuthException(error: DomainException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.UNAUTHORIZED,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.UNAUTHORIZED.url}`,
      title: ProblemTypeModel.UNAUTHORIZED.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleAuthForbiddenException(error: ForbiddenException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.FORBIDDEN,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.FORBIDDEN.url}`,
      title: ProblemTypeModel.FORBIDDEN.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleEntityNotFoundException(error: EntityNotFoundException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.NOT_FOUND,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.ENTITY_NOT_FOUND.url}`,
      title: ProblemTypeModel.ENTITY_NOT_FOUND.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }
  private handleDomainException(error: DomainException): ProblemMessage {
    const message: ProblemMessage = {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.DOMAIN_RULE.url}`,
      title: ProblemTypeModel.DOMAIN_RULE.title,
      detail: error.message,
      timestamp: DateTime.utc().toISO(),
    }
    return message
  }

  private handleValidationException(error: ValidationException): ProblemMessage {
    const fields: ProblemField[] = []
    for (const validationError of error.validationErrors) {
      fields.push({
        field: validationError.property,
        errors: validationError.constraints ? validationError.constraints : this.mountField(validationError.children),
      })
    }
    const message: ProblemMessage = {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      type: `${ProblemTypeModel.URLBASE}${ProblemTypeModel.INVALID_DATA.url}`,
      title: ProblemTypeModel.INVALID_DATA.title,
      detail: 'Campos invalidos',
      timestamp: DateTime.utc().toISO(),
      fields,
    }
    return message
  }

  private mountField(errors): ProblemField[] {
    const fields: ProblemField[] = []
    for (const validationError of errors) {
      fields.push({
        field: validationError.property,
        errors: validationError.constraints ? validationError.constraints : this.mountField(validationError.children),
      })
    }
    return fields
  }
}
