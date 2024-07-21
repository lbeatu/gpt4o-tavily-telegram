import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { Context, Telegraf } from 'telegraf';
import { TavilyService } from '../tavily/tavily.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf<Context>;

  constructor(
    private configService: ConfigService,
    private openAiService: OpenAiService,
    private tavilyService: TavilyService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    this.bot = new Telegraf(token);
  }

  onModuleInit() {
    this.bot.start(ctx =>
      ctx.reply('Welcome! Ask me about finance or anything else.'),
    );
    this.bot.help(ctx =>
      ctx.reply('Send me a message and I will get the response from OpenAI.'),
    );

    this.bot.on('text', async ctx => {
      const userMessage = ctx.message.text;
      try {
        // Perform the search using Tavily
        const tavilyData = await this.tavilyService.search(userMessage);

        // Create a completion with the OpenAI service, passing the tools
        const aiResponse = await this.openAiService.createCompletion(
          `I am a financial advisor. I have been asked the following question: ${userMessage}. Here is my response: ${JSON.stringify(tavilyData)}`,
        );
        await ctx.reply(aiResponse);
      } catch (error) {
        console.error('Error processing message', error);
        await ctx.reply('Sorry, something went wrong.');
      }
    });

    this.bot
      .launch()
      .then(() => {
        console.log('Bot is running');
      })
      .catch(error => {
        console.error('Error launching bot', error);
      });
  }

  async sendMessage(chatId: number, text: string) {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
