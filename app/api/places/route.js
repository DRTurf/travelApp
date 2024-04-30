import { NextResponse } from "next/server";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GEMINI_API_KEY;

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(`Give me history, culture, food and religion about ${prompt} in valid JSON format without the json notation in the front, the inverted commas and the triple tildas in the beginning and the end and bad control character in string literal`);
  const response = result.response;
  const details = JSON.parse(response.text());

  return details;
}




export async function POST(req) {
  try {
    const {prompt} = await req.json();
    console.log(prompt);
    if (!prompt) {
      return NextResponse.json({
        status: 400,
        error: "Missing prompt in request body",
      });
    }
    const answer = await runChat(prompt);
    return NextResponse.json({
      status: 200,
      answer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
    });
  }
}