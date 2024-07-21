import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TavilyService } from '../tavily/tavily.service';
import { CreateCompletionDto } from './dto/CreateCompletionDto';
import { OpenAiService } from './open-ai.service';

@ApiTags('openai')
@Controller('openai')
export class OpenAiController {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly tavilyService: TavilyService,
  ) {}

  @Post('completion')
  @ApiOperation({ summary: 'Create a completion based on the prompt' })
  @ApiResponse({
    status: 201,
    description: 'The completion has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createCompletion(@Body() createCompletionDto: CreateCompletionDto) {
    const tavilyData = await this.tavilyService.search(
      createCompletionDto.prompt,
    );

    return this.openAiService.createCompletion(
      `User asked: ${createCompletionDto.prompt}\n\n Tavily data: ${JSON.stringify(tavilyData)} `,
    );
  }
}
