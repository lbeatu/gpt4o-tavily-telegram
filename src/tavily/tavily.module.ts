import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TavilyService } from './tavily.service';

@Module({
  imports: [ConfigModule],
  providers: [TavilyService],
  exports: [TavilyService],
})
export class TavilyModule {}
