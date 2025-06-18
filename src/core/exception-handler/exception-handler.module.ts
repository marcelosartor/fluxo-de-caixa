import { Global, Module } from '@nestjs/common'
import { HandleMessageService } from './infra/services/handle-message.service'
import { ForbiddenExceptionHandlerFilter } from './infra/filters/forbidden-exception-handler.filter'

@Global()
@Module({
  providers: [HandleMessageService],
  exports: [HandleMessageService],
})
export class ExceptionHandlerModule {}
