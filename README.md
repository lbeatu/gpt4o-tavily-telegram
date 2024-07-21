# NestJS OpenAI and Tavily Integration Project

This project integrates OpenAI's GPT-4o model with Tavily API to create a finance assistant. The assistant can provide real-time stock market information and other financial data by querying the web using Tavily API and generating responses using OpenAI's GPT-4o model. Tavily API is used because OpenAI services do not have internet access, so Tavily provides the necessary web data.

## Table of Contents

- [NestJS OpenAI and Tavily Integration Project](#nestjs-openai-and-tavily-integration-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [Telegram Bot](#telegram-bot)
      - [Creating a Telegram Bot](#creating-a-telegram-bot)
      - [Interacting with the Bot](#interacting-with-the-bot)
    - [API Endpoints](#api-endpoints)
      - [Create Completion](#create-completion)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Integrates OpenAI's GPT-4o model for generating natural language responses.
- Uses Tavily API for real-time web scraping and data retrieval.
- Provides a Telegram bot interface for user interaction.

## Prerequisites

- Node.js and npm installed
- OpenAI API key
- Tavily API key
- Telegram bot token

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nestjs-openai-tavily.git
   cd nestjs-openai-tavily
   ```

2. Install the Node.js dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your API keys and tokens:

   ```plaintext
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   OPENAI_API_KEY=your_openai_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

## Running the Application

1. Start the NestJS application:

   ```bash
   npm run start
   ```

2. The application will run on `http://localhost:3000`.

## Usage

### Telegram Bot

#### Creating a Telegram Bot

To interact with the bot on Telegram, you first need to create a bot using BotFather:

1. Open Telegram and search for `@BotFather`.
2. Start a conversation with BotFather by clicking on `Start`.
3. Create a new bot by sending the command `/newbot`.
4. Follow the instructions to choose a name and username for your bot. The username must end in `bot` (e.g., `finance_assistant_bot`).
5. After creating the bot, BotFather will provide you with a token. This token is needed for your bot to authenticate with the Telegram API. Add this token to your `.env` file:

   ```plaintext
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   ```

#### Interacting with the Bot

Once the bot is set up and running:

1. Open Telegram and search for your bot using the bot username.
2. Start a conversation with the bot and ask financial questions.
3. The bot will use Tavily API to fetch real-time data and OpenAI's GPT-4o model to generate responses.

### API Endpoints

#### Create Completion

- **URL:** `/openai/completion`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "prompt": "What is the latest news on Tesla?"
  }
  ```

- **Response:**

  ```json
  {
    "response": "The latest news on Tesla is..."
  }
  ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
