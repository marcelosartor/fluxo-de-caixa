import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Response, response } from 'express'
import { DateTime } from 'luxon'
import { ProblemMessage } from '../../domain/interfaces/problem-message.interface'
import { ProblemTypeModel } from '../../domain/models/problem-type.model'
import { AuthUnauthorizedException } from '../../domain/exceptions/auth-unauthorized.exception'
import { AuthException } from '../../domain/exceptions/auth.exception'
import { HandleMessageService } from '../services/handle-message.service'

/* TODO - Versao Final 
@Injectable()
@Catch(ForbiddenException)
export class ForbiddenExceptionHandlerFilter<T extends ForbiddenException> implements ExceptionFilter {
  constructor(@Inject() private readonly handleMessageService: HandleMessageService) {}
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const message: ProblemMessage = this.handleMessageService.mountMessage(exception)
    response.status(message.status).send({
      ...message,
    })
  }
}
*/

/* TODO - Versao para Debug */
@Injectable()
@Catch(HttpException)
export class ForbiddenExceptionHandlerFilter<T extends ForbiddenException> implements ExceptionFilter {
  constructor(@Inject() private readonly handleMessageService: HandleMessageService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    if (exception instanceof ForbiddenException) {
      const message: ProblemMessage = this.handleMessageService.mountMessage(exception)
      response.status(message.status).send({
        ...message,
      })
    }
    response.status(exception.getStatus()).send(exception.getResponse())
  }
}
