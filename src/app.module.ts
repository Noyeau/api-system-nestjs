import { Module, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';

import { AppService } from './services/app.service';
import { ApiController } from './controllers/api.controller';
import { AppController } from './controllers/app.controller';
import { ApiService } from './services/api.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Api } from './entities/api.entity';
import { App } from './entities/app.entity';
import { AuthMiddleware } from './auth.middleware';
import { environment } from './environment/environment';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(environment.bddConfig),
    // TypeOrmModule.forRoot(Config.thisApi.data.bddConfig),
    TypeOrmModule.forFeature([App, Api])
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
