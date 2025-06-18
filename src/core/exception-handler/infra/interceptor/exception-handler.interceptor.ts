import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { HandleMessageService } from '../services/handle-message.service'

@Injectable()
export class ExceptionHandlerInterceptor implements NestInterceptor {
  constructor(private readonly handleMessageService: HandleMessageService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Error> {
    return next.handle().pipe(
      catchError(error => {
        throw this.handleMessageService.execute(error)
      }),
    )
  }
}
