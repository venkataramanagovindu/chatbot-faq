import { NextResponse } from "next/server";
import { OpenAI } from "openai";  // Import the OpenAI client

// Initialize the OpenAI client with your API key
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const MOCK_API_URL = "https://67e755056530dbd31112f96d.mockapi.io/faqs";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POSTMock(req: Request) {
  try {
    new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // Fetch FAQs from MockAPI
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const faqs = await response.json();
    console.log("FAQs:", faqs);

    // Example: Select the first FAQ's message as the answer
    const answer = faqs[0].message;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POSTOpenAI(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API Key is missing" }, { status: 500 });
    }

  //   // Use OpenAI API to answer the question
  //   const response = await openai.responses.create({
  //     model: "gpt-4o",
  //     input: "Write a one-sentence bedtime story about a unicorn.",
  // });

  //   // Extract the answer from the OpenAI response
  //   const answer = response.output_text;


    // Sample mock response based on the question
    const mockAnswers: Record<string, string> = {
      "What is your name?": "I am your friendly chatbot!",
      "What is the weather today?": "It looks sunny outside!",
      "What is the capital of France?": "The capital of France is Paris.",
    };

    const answer = mockAnswers[question] || "Sorry, I don't know the answer to that question.";

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    return NextResponse.json({ error: "Failed to fetch OpenAI response" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return POSTOpenAI(req);
}
