import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiModule } from 'src/open-ai/open-ai.module';
import { TavilyModule } from 'src/tavily/tavily.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [ConfigModule, OpenAiModule, TavilyModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
