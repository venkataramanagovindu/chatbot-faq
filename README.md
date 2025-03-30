# FAQ Chatbot API

This project provides an API for a chatbot that answers frequently asked questions (FAQs) using the OpenAI API. It simulates a real-time interaction by dynamically generating responses based on user queries.

## Features

- Utilizes OpenAI API to generate dynamic answers to FAQs.
- Allows querying the chatbot with a question, and the chatbot returns a relevant answer.
- Supports delayed responses to simulate real-time interaction, similar to a real chatbot.

## Project Structure

```
pages/
  api/
    ask.ts       # Handles user questions and fetches answers from OpenAI API
    route.tsx    # API route handlers for processing requests
components/      # Reusable components for UI (if applicable)
styles/          # Global styles (optional)
README.md        # Project documentation
```

## Setup & Installation

### Prerequisites

1. **Node.js** installed (v14.x or later)
2. **TypeScript** (optional but recommended for type safety)
3. **Next.js** application

### Steps to Run the Project Locally

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/faq-chatbot-api.git
cd faq-chatbot-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env.local` file at the root of the project and add your OpenAI API key:**

```env
OPENAI_API_KEY=your-openai-api-key-here
```

4. **Run the application:**

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

## API Endpoints

### POST `/api/ask`

#### Request Body

A JSON object with a `question` property.

**Example:**

```json
{
  "question": "What is the capital of France?"
}
```

#### Response Example

```json
{
  "answer": "The capital of France is Paris."
}
```

#### Response Codes

- `200 OK`: Successfully fetched the answer.
- `400 Bad Request`: Missing or invalid question parameter.
- `500 Internal Server Error`: Something went wrong while processing the request.

### POST `/api/mock`

Simulates a mock FAQ service.

#### Request Body

```json
{
  "question": "What is the weather today?"
}
```

#### Response Example

```json
{
  "answer": "It looks sunny outside!"
}
```

## Code Explanation

### API Route (`route.tsx`)

- `POSTOpenAI`: This function uses the OpenAI API to generate answers dynamically based on the user's question. You need to provide your OpenAI API key for this functionality to work.

### Chat Component (`chat.tsx`)

- Manages the chat interface, including sending and receiving messages between the user and the bot.
- Handles UI elements like dark mode, sidebar, chat history, and animated message rendering using framer-motion.

## Additional Information

### Extending Functionality

- You can extend the functionality of the bot by adding new types of questions or integrating with other external services using their respective APIs.

### Adding More Routes

- If you want to add additional routes or modify the chatbot behavior, you can extend the `route.tsx` file with more API functions.

## Contributing

Feel free to fork this project, make improvements, and submit pull requests. Contributions are always welcome!

## License

This project is open-source and available under the MIT License.

