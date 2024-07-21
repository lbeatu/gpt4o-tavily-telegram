import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key is not defined');
    }

    const options: ClientOptions = {
      apiKey,
    };

    this.openai = new OpenAI(options);
  }

  async createCompletion(prompt: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a finance expert. Your goal is to provide answers based on information from the internet. You should never use your own knowledge to answer questions. Please include relevant url sources in the end of your answers.',
          },
          { role: 'user', content: prompt },
        ],
      });
      console.log(response.choices[0].message);
      return response.choices[0].message.content;
    } catch (error) {
      if (error.response || error?.error) {
        throw new BadRequestException({ ...error?.error });
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the completion',
        );
      }
    }
  }
}
