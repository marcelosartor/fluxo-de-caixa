import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommunsModule } from './core/communs/communs.module';
import { EnvConfigModule } from './core/env-config/env-config.module';
import { ExceptionHandlerModule } from './core/exception-handler/exception-handler.module';

@Module({
  imports: [
    EnvConfigModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './database.sqlite',
      dropSchema: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    CommunsModule,
    ExceptionHandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
