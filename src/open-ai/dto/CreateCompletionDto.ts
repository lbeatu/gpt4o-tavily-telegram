import { ApiProperty } from '@nestjs/swagger';

export class CreateCompletionDto {
  @ApiProperty({
    description: 'The prompt to send to the OpenAI API',
    example: 'Hello, how are you?',
  })
  prompt: string;
}
