import { Module } from '@nestjs/common';
import { TavilyModule } from 'src/tavily/tavily.module';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';

@Module({
  imports: [TavilyModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
