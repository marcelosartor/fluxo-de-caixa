
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvConfigService } from './core/env-config/services/env-config.service';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './core/exception-handler/domain/exceptions/validation.exception';
import { ExceptionHandlerInterceptor } from './core/exception-handler/infra/interceptor/exception-handler.interceptor';
import { HandleMessageService } from './core/exception-handler/infra/services/handle-message.service';
import { ForbiddenExceptionHandlerFilter } from './core/exception-handler/infra/filters/forbidden-exception-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    
  })
  const configService = app.get(EnvConfigService)

  const config = new DocumentBuilder()
    .setTitle('Fluxo de Caixa')
    .setDescription('Fluxo de Caixa para demostração de DDD')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('apidoc', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors)
      },
    }),
  )
  app.useGlobalInterceptors(new ExceptionHandlerInterceptor(HandleMessageService.getInstance()))
  app.useGlobalFilters(new ForbiddenExceptionHandlerFilter(HandleMessageService.getInstance()))

  app.setGlobalPrefix('api')
  app.enableCors({
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${configService.getAppPort() ?? 3000}`)
}
bootstrap();
