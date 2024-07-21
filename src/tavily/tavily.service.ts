import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TavilyService {
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TAVILY_API_KEY');
    if (!this.apiKey) {
      throw new Error('Tavily API key is not defined');
    }
  }

  async search(query: string): Promise<string> {
    console.log(query);
    try {
      const response = await axios.post('https://api.tavily.com/search', {
        api_key: this.apiKey,
        query: query,
        search_depth: 'advanced',
        max_results: 5,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to fetch data from Tavily',
      );
    }
  }
}
