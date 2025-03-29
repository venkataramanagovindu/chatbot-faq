// import {OpenAI} from "openai";
// export default async function OpenAIComponent() {
//     console.log("API Key:", process.env.OPENAI_API_KEY);

// // const client = new OpenAI({
// //     apiKey: process.env.OPENAI_API_KEY,
// //   });

// // const response = await client.responses.create({
// //     model: "gpt-4o",
// //     input: "Write a one-sentence bedtime story about a unicorn."
// // });

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
  
//   try {
//     const response = await client.responses.create({
//       model: "gpt-4o",
//       input: "Write a one-sentence bedtime story about a unicorn.",
//     });
  
//     console.log(response);
//   } catch (error: unknown) {
//     console.error("Error:", error);
//     if (typeof error === "object" && error !== null && "code" in error) {
//       const err = error as { code: string; message?: string };
  
//       console.error("OpenAI API Error:", err.message || "No message available");
  
//       if (err.code === "insufficient_quota") {
//         console.log("You need to check your OpenAI billing or reduce API calls.");
//       }
//     } else {
//       console.error("An unknown error occurred:", error);
//     }
//   }
  
  

// // console.log(response.output_text);

//     return (
//         <div>
//         <h1>OpenAI</h1>
//         <p>This is the OpenAI component.</p>
//         </div>
//     );
// }

import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

const API_URL = "https://67e755056530dbd31112f96d.mockapi.io/faqs";
const MOCK_API_URL = "https://67e755056530dbd31112f96d.mockapi.io/faqs";

export async function GET() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const faqs = await response.json();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  // try {
  //   const { question } = await req.json();

  //   if (!question) {
  //     return NextResponse.json({ error: "Question is required" }, { status: 400 });
  //   }

  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4o",
  //     messages: [{ role: "user", content: `Answer this FAQ: ${question}` }],
  //   });

  //   return NextResponse.json({ answer: response.choices[0]?.message?.content });
  // } catch (error) {
  //   console.error("Error fetching answer:", error);
  //   return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  // }
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

    const answer = faqs[0].message;

    return NextResponse.json({answer});
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
