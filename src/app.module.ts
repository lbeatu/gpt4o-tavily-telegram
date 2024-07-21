import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiModule } from './open-ai/open-ai.module';
import { TavilyModule } from './tavily/tavily.module';
import { TelegramModule } from './telegram/telegram.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAiModule,
    TelegramModule,
    TavilyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
